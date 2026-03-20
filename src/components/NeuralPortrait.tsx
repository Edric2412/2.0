import React, { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION ---
const DEFAULT_IMAGE = '/neuralimage.png';
const MORPH_TEXT = 'EJS';
const CONFIG = {
  // Appearance
  bgInner: '#301756',
  bgOuter: '#150330',
  nodeColors: ['#c77dff', '#e6b8ff', '#9d4edd'],
  pulseColor: '#ffffff',
  pulseGlow: '#e6b8ff',
  
  // Network Topography
  resolution: 2, 
  maxNodeSpacing: 0.012, // Reduced to ensure skin/flat areas still get a recognizable mesh
  minNodeSpacing: 0.0015, // Ultra-tight packing for fine details like eyes/mustache
  connectionDistance: 0.015, // Tighter lines preserve facial contours instead of bridging gaps
  maxConnections: 5, 
  hubRatio: 0.04, 
  
  // Animation & Physics
  parallaxStrength: 0.10, // Reduced slightly to prevent facial feature distortion
  morphStart: 0.10, // Adjusted for the page scroll
  morphEnd: 0.85,
  pulseCount: 60,
  pulseSpeedBase: 0.015,
};

// --- EASING ---
const cubicEaseInOut = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export function NeuralPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let nodes: any[] = [];
    let pulses: any[] = [];
    let animationFrameId: number;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    let bgGradient: CanvasGradient | null = null;
    let sinCache: number[] = [];
    let cosCache: number[] = [];

    // --- SETUP & RESIZE ---
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        
        bgGradient = ctx.createRadialGradient(
          canvasWidth / 2, canvasHeight / 2, 0,
          canvasWidth / 2, canvasHeight / 2, Math.max(canvasWidth, canvasHeight) * 0.8
        );
        bgGradient.addColorStop(0, CONFIG.bgInner);
        bgGradient.addColorStop(1, CONFIG.bgOuter);
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- SCROLL ENGINE ---
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      scrollProgressRef.current = Math.max(0, Math.min(1, progress));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- IMAGE PROCESSING (ADAPTIVE STIPPLING) ---
    const processImage = (img: HTMLImageElement) => {
      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return [];
      const procWidth = 400;
      const procHeight = 400 * (img.height / img.width);
      offscreen.width = procWidth;
      offscreen.height = procHeight;
      
      // 1. Draw original FIRST to capture exact alpha mask (for background-removed images)
      oCtx.drawImage(img, 0, 0, procWidth, procHeight);
      const alphaData = oCtx.getImageData(0, 0, procWidth, procHeight).data;

      // 2. Fill white to prevent transparent pixels from becoming black holes
      oCtx.fillStyle = '#ffffff';
      oCtx.fillRect(0, 0, procWidth, procHeight);

      // 3. Removed contrast boost so we don't blow out midtones (skin details)
      oCtx.filter = 'grayscale(100%)';
      oCtx.drawImage(img, 0, 0, procWidth, procHeight);
      const imgData = oCtx.getImageData(0, 0, procWidth, procHeight).data;
      
      const rawPoints: any[] = [];
      const centerX = procWidth / 2;
      const centerY = procHeight * 0.4; 
      const maxRadius = Math.sqrt(centerX*centerX + centerY*centerY);

      const getLuma = (px: number, py: number) => {
        const i = (py * procWidth + px) * 4;
        return imgData[i]; 
      };

      for (let y = 1; y < procHeight - 1; y += CONFIG.resolution) {
        for (let x = 1; x < procWidth - 1; x += CONFIG.resolution) {
          
          // Extract Alpha. If pixel is transparent/background, SKIP IT.
          const alphaIdx = (y * procWidth + x) * 4 + 3;
          const alpha = alphaData[alphaIdx];
          if (alpha < 20) continue;
          
          const tl = getLuma(x - 1, y - 1);
          const tc = getLuma(x, y - 1);
          const tr = getLuma(x + 1, y - 1);
          const ml = getLuma(x - 1, y);
          const centerLuma = getLuma(x, y); // Use exact center for darkness
          const mr = getLuma(x + 1, y);
          const bl = getLuma(x - 1, y + 1);
          const bc = getLuma(x, y + 1);
          const br = getLuma(x + 1, y + 1);

          const gx = -tl + tr - 2 * ml + 2 * mr - bl + br;
          const gy = -tl - 2 * tc - tr + bl + 2 * bc + br;
          
          const edgeStrength = Math.sqrt(gx * gx + gy * gy);
          const darkness = 255 - centerLuma; // Darker pixels (hair, beard, eyes) get higher value

          // Boosted edge sensitivity and added a base score (+40) so the whole face is mapped
          const featureScore = (edgeStrength * 2.0) + (darkness * 1.0) + 40;
          
          const distToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
          // Relaxed falloff to keep jawline/hair edges sharp
          const falloff = Math.max(0.3, 1 - (distToCenter / (maxRadius * 1.5)));
          
          const finalScore = featureScore * falloff;

          if (finalScore > 30) {
            rawPoints.push({
              nx: x / procWidth,
              ny: y / procHeight,
              score: finalScore,
              luma: centerLuma // Store luminance to scale node size later
            });
          }
        }
      }

      // ADAPTIVE SPATIAL FILTERING WITH FAST GRID-HASH (Allows massive detail increase)
      rawPoints.sort((a, b) => b.score - a.score);
      const imagePoints: any[] = [];
      
      const gridCols = Math.ceil(1 / CONFIG.minNodeSpacing);
      const gridRows = Math.ceil(1 / CONFIG.minNodeSpacing);
      const grid: any[][] = new Array(gridCols * gridRows).fill(null).map(() => []);

      for (const pt of rawPoints) {
        // Map score to required spacing. High score = allowed to pack tight. Low score = forced apart.
        const normalizedScore = Math.min(1, (pt.score - 30) / 250);
        const requiredSpacing = CONFIG.maxNodeSpacing - (CONFIG.maxNodeSpacing - CONFIG.minNodeSpacing) * normalizedScore;
        const reqSpacingSq = requiredSpacing * requiredSpacing;

        let tooClose = false;
        const col = Math.floor(pt.nx / CONFIG.minNodeSpacing);
        const row = Math.floor(pt.ny / CONFIG.minNodeSpacing);
        const searchRadius = Math.ceil(requiredSpacing / CONFIG.minNodeSpacing);

        for (let r = Math.max(0, row - searchRadius); r <= Math.min(gridRows - 1, row + searchRadius); r++) {
          for (let c = Math.max(0, col - searchRadius); c <= Math.min(gridCols - 1, col + searchRadius); c++) {
            const cellIdx = r * gridCols + c;
            if (cellIdx < 0 || cellIdx >= grid.length) continue;
            
            for (const accepted of grid[cellIdx]) {
              const dx = pt.nx - accepted.nx;
              const dy = pt.ny - accepted.ny;
              if (dx * dx + dy * dy < reqSpacingSq) {
                tooClose = true;
                break;
              }
            }
            if (tooClose) break;
          }
          if (tooClose) break;
        }

        if (!tooClose) {
          imagePoints.push(pt);
          grid[row * gridCols + col].push(pt);
        }
      }

      const MAX_NODES = window.innerWidth < 768 ? 800 : 1500;
      if (imagePoints.length > MAX_NODES) {
        imagePoints.length = MAX_NODES;
      }

      return imagePoints;
    };

    // --- TEXT PROCESSING ---
    const processText = () => {
      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return [];
      const tWidth = 600;
      const tHeight = 400;
      offscreen.width = tWidth;
      offscreen.height = tHeight;
      
      oCtx.fillStyle = '#000';
      oCtx.fillRect(0, 0, tWidth, tHeight);
      
      oCtx.font = 'bold 220px system-ui, -apple-system, sans-serif';
      oCtx.fillStyle = '#fff';
      oCtx.textAlign = 'center';
      oCtx.textBaseline = 'middle';
      oCtx.fillText(MORPH_TEXT, tWidth / 2, tHeight / 2);
      
      const imgData = oCtx.getImageData(0, 0, tWidth, tHeight).data;
      const rawTextPoints: any[] = [];
      
      for (let y = 0; y < tHeight; y += CONFIG.resolution) {
        for (let x = 0; x < tWidth; x += CONFIG.resolution) {
          const i = (y * tWidth + x) * 4;
          if (imgData[i] > 128) {
             rawTextPoints.push({
               nx: x / tWidth,
               ny: y / tHeight,
             });
          }
        }
      }

      rawTextPoints.sort(() => Math.random() - 0.5); 
      const textPoints: any[] = [];
      const textSpacing = CONFIG.minNodeSpacing * 1.5;
      const textSpacingSq = textSpacing * textSpacing; 

      // Apply fast grid-hash to text as well
      const gridCols = Math.ceil(1 / CONFIG.minNodeSpacing);
      const gridRows = Math.ceil(1 / CONFIG.minNodeSpacing);
      const grid: any[][] = new Array(gridCols * gridRows).fill(null).map(() => []);

      for (const pt of rawTextPoints) {
        let tooClose = false;
        const col = Math.floor(pt.nx / CONFIG.minNodeSpacing);
        const row = Math.floor(pt.ny / CONFIG.minNodeSpacing);
        const searchRadius = Math.ceil(textSpacing / CONFIG.minNodeSpacing);

        for (let r = Math.max(0, row - searchRadius); r <= Math.min(gridRows - 1, row + searchRadius); r++) {
          for (let c = Math.max(0, col - searchRadius); c <= Math.min(gridCols - 1, col + searchRadius); c++) {
            const cellIdx = r * gridCols + c;
            if (cellIdx < 0 || cellIdx >= grid.length) continue;
            
            for (const accepted of grid[cellIdx]) {
              const dx = pt.nx - accepted.nx;
              const dy = pt.ny - accepted.ny;
              if (dx * dx + dy * dy < textSpacingSq) {
                tooClose = true;
                break;
              }
            }
            if (tooClose) break;
          }
          if (tooClose) break;
        }

        if (!tooClose) {
          textPoints.push(pt);
          grid[row * gridCols + col].push(pt);
        }
      }

      return textPoints;
    };

    // --- INIT NEURAL NETWORK ---
    const initNetwork = (imagePoints: any[], textPoints: any[]) => {
      nodes = [];
      const numNodes = imagePoints.length;
      
      for (let i = 0; i < numNodes; i++) {
        let density = 0;
        for (let j = 0; j < numNodes; j++) {
          if (i === j) continue;
          const dx = imagePoints[i].nx - imagePoints[j].nx;
          const dy = imagePoints[i].ny - imagePoints[j].ny;
          if (dx*dx + dy*dy < 0.001) density++; 
        }
        imagePoints[i].finalHubScore = density + (imagePoints[i].score * 0.1);
      }

      const sortedIndices = [...Array(numNodes).keys()].sort((a, b) => imagePoints[b].finalHubScore - imagePoints[a].finalHubScore);
      const hubCount = Math.floor(numNodes * CONFIG.hubRatio);
      const hubSet = new Set(sortedIndices.slice(0, hubCount));

      imagePoints.sort((a, b) => (a.ny * 10 + a.nx) - (b.ny * 10 + b.nx));
      textPoints.sort((a, b) => (a.ny * 10 + a.nx) - (b.ny * 10 + b.nx));
      
      for (let i = 0; i < numNodes; i++) {
        const pt = imagePoints[i];
        const tPt = textPoints[i % textPoints.length];
        const isHub = hubSet.has(i);
        
        // Halftone Shading: Darker areas get larger nodes, brighter areas get tiny nodes
        const lumaFactor = pt.luma !== undefined ? (1 - (pt.luma / 255)) : 0.5;
        const baseRadius = isHub ? (1.0 + lumaFactor * 1.5) : (0.2 + lumaFactor * 0.8);
        
        nodes.push({
          id: i,
          startX: pt.nx,
          startY: pt.ny,
          targetX: tPt.nx + (Math.random() - 0.5) * 0.01,
          targetY: tPt.ny + (Math.random() - 0.5) * 0.01,
          x: pt.nx,
          y: pt.ny,
          z: Math.random(),
          isHub: isHub,
          radius: baseRadius, 
          color: CONFIG.nodeColors[Math.floor(Math.random() * CONFIG.nodeColors.length)],
          connections: [], 
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const distances = [];
        
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const nodeB = nodes[j];
          const dist = Math.hypot(nodeA.startX - nodeB.startX, nodeA.startY - nodeB.startY);
          
          if (dist < CONFIG.connectionDistance) {
            const weight = nodeB.isHub ? dist * 0.5 : dist;
            distances.push({ id: j, dist, weight });
          }
        }
        
        distances.sort((a, b) => a.weight - b.weight);
        const connectionsCount = nodeA.isHub ? CONFIG.maxConnections : Math.min(CONFIG.maxConnections - 2, distances.length);
        
        nodeA.connections = distances.slice(0, connectionsCount).map(d => d.id);
      }

      sinCache = new Array(nodes.length).fill(0);
      cosCache = new Array(nodes.length).fill(0);

      pulses = [];
      for (let i = 0; i < CONFIG.pulseCount; i++) {
        spawnPulse();
      }
    };

    const spawnPulse = (pulseIndex: number | null = null) => {
      let sourceNode;
      let attempts = 0;
      do {
        sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
        attempts++;
      } while (sourceNode.connections.length === 0 && attempts < 50);

      if (sourceNode.connections.length === 0) return;

      const targetNodeId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
      
      const pulse = {
        sourceId: sourceNode.id,
        targetId: targetNodeId,
        progress: 0,
        speed: CONFIG.pulseSpeedBase + Math.random() * 0.02,
        size: Math.random() * 1.2 + 0.8
      };

      if (pulseIndex !== null) {
        pulses[pulseIndex] = pulse;
      } else {
        pulses.push(pulse);
      }
    };

    // --- MAIN RENDER LOOP ---
    let lastFrameTime = 0;
    let frameCount = 0;

    const render = (time: number) => {
      if (time - lastFrameTime < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = time;
      frameCount++;

      if (bgGradient) {
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
      
      const scroll = scrollProgressRef.current;
      let morphFactor = 0;
      
      if (scroll > CONFIG.morphStart) {
        morphFactor = (scroll - CONFIG.morphStart) / (CONFIG.morphEnd - CONFIG.morphStart);
        morphFactor = Math.min(1, Math.max(0, morphFactor));
      }
      const easedMorph = cubicEaseInOut(morphFactor);

      const isPortrait = canvasHeight > canvasWidth;
      const drawSize = isPortrait ? canvasWidth * 0.9 : canvasHeight * 0.8;
      
      const imgOffX = (canvasWidth - drawSize) / 2;
      const imgOffY = (canvasHeight - drawSize) / 2;
      
      const txtWidth = Math.min(canvasWidth * 0.8, 800);
      const txtHeight = txtWidth * 0.6;
      const txtOffX = (canvasWidth - txtWidth) / 2;
      const txtOffY = (canvasHeight - txtHeight) / 2;

      const timeSec = Date.now() * 0.001;

      if (frameCount % 3 === 0) {
        for (let i = 0; i < nodes.length; i++) {
          sinCache[i] = Math.sin(timeSec * 0.5 + nodes[i].id);
          cosCache[i] = Math.cos(timeSec * 0.4 + nodes[i].id);
        }
      }

      nodes.forEach((node, i) => {
        const sX = imgOffX + node.startX * drawSize;
        const sY = imgOffY + node.startY * drawSize;
        
        const tX = txtOffX + node.targetX * txtWidth;
        const tY = txtOffY + node.targetY * txtHeight;
        
        let currentX = lerp(sX, tX, easedMorph);
        let currentY = lerp(sY, tY, easedMorph);
        
        // Calmer organic drift so detailed features don't smear
        const driftMultiplier = (1 - easedMorph); 
        const driftX = sinCache[i] * (node.isHub ? 0.5 : 1.5) * driftMultiplier;
        const driftY = cosCache[i] * (node.isHub ? 0.5 : 1.5) * driftMultiplier;
        
        const parallaxOffset = (scroll - 0.5) * node.z * canvasHeight * CONFIG.parallaxStrength;
        
        node.currentX = currentX + driftX;
        node.currentY = currentY + driftY - parallaxOffset; 
      });

      ctx.globalCompositeOperation = 'screen';

      nodes.forEach(nodeA => {
        if (nodeA.z < 0.15) return;

        nodeA.connections.forEach((targetId: number) => {
          const nodeB = nodes[targetId];
          if (nodeB.z < 0.15) return;

          const dist = Math.hypot(nodeA.currentX - nodeB.currentX, nodeA.currentY - nodeB.currentY);
          
          if (dist > canvasWidth * 0.12) return;
          
          const opacity = 1 - (dist / (canvasWidth * 0.12));
          ctx.beginPath();
          ctx.moveTo(nodeA.currentX, nodeA.currentY);
          ctx.lineTo(nodeB.currentX, nodeB.currentY);
          
          if (nodeA.isHub && nodeB.isHub) {
            ctx.strokeStyle = `rgba(230, 184, 255, ${opacity * 0.8})`;
            ctx.lineWidth = 0.8;
          } else if (nodeA.isHub || nodeB.isHub) {
            ctx.strokeStyle = `rgba(199, 125, 255, ${opacity * 0.4})`;
            ctx.lineWidth = 0.4;
          } else {
            ctx.strokeStyle = `rgba(157, 78, 221, ${opacity * 0.15})`;
            ctx.lineWidth = 0.2;
          }
          ctx.stroke();
        });
      });

      pulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          spawnPulse(index); 
          return;
        }

        const source = nodes[pulse.sourceId];
        const target = nodes[pulse.targetId];
        
        if (source.z < 0.15 || target.z < 0.15) return;

        const px = lerp(source.currentX, target.currentX, pulse.progress);
        const py = lerp(source.currentY, target.currentY, pulse.progress);

        ctx.beginPath();
        ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.pulseColor;
        ctx.fill();
      });

      nodes.forEach(node => {
        if (node.z < 0.15) return;

        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        if (node.isHub) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = node.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; 
      });

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const imagePoints = processImage(img);
        const textPoints = processText();
        initNetwork(imagePoints, textPoints);
        setIsLoaded(true);
        requestAnimationFrame(render);
      } catch (e) {
        console.error("Error processing image/text:", e);
        setError("Failed to generate neural map.");
      }
    };
    img.onerror = () => {
      setError("Failed to load image. Please select it manually.");
    };
    img.src = imageUrl;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setIsLoaded(false);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#150330]">
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 font-mono text-sm z-50 bg-[#150330]/90 backdrop-blur-sm">
            <p className="mb-4">{error}</p>
            <label className="cursor-pointer px-4 py-2 bg-[#9d4edd] text-white rounded hover:bg-[#c77dff] transition-colors">
              Select Image
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        )}
        
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-[#9d4edd] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#e6b8ff] font-mono tracking-widest text-xs uppercase">Synthesizing Neural Map...</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#e6b8ff]/60 font-mono text-[10px] tracking-[0.2em] pointer-events-none animate-pulse text-center w-full">
          SCROLL TO INITIATE MORPH SEQUENCE
        </div>
      </div>
    </div>
  );
}
