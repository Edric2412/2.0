import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import neuralImage from '../assets/neuralimage.png?url';

// --- CONFIGURATION ---
const DEFAULT_IMAGE = neuralImage;
const MORPH_TEXT = 'EJS';

const THEME_CONFIG = {
  dark: {
    bgInner: '#301756',
    bgOuter: '#150330',
    nodeColors: ['#c77dff', '#e6b8ff', '#9d4edd'],
    pulseColor: '#ffffff',
    lineNormal: 'rgba(157, 78, 221, 0.2)',
    lineMixed: 'rgba(199, 125, 255, 0.4)',
    lineHub: 'rgba(230, 184, 255, 0.8)',
    hubGlow: 'rgba(230, 184, 255, 0.4)',
    composite: 'screen' as GlobalCompositeOperation,
    bgFallback: '#150330',
    textColor: '#e6b8ff',
  },
  light: {
    bgInner: '#f3e8ff',
    bgOuter: '#faf5ff',
    nodeColors: ['#7b2cbf', '#5a189a', '#9d4edd'],
    pulseColor: '#ffffff',
    lineNormal: 'rgba(123, 44, 191, 0.2)',
    lineMixed: 'rgba(90, 24, 154, 0.4)',
    lineHub: 'rgba(60, 9, 108, 0.8)',
    hubGlow: 'rgba(123, 44, 191, 0.2)',
    composite: 'source-over' as GlobalCompositeOperation,
    bgFallback: 'transparent',
    textColor: '#7b2cbf',
  }
};

const SHARED_CONFIG = {
  // Network Topography
  resolution: 3, 
  maxNodeSpacing: 0.016, 
  minNodeSpacing: 0.007, 
  connectionDistance: 0.016, 
  maxConnections: 3, 
  hubRatio: 0.02, 
  
  // Animation & Physics
  parallaxStrength: 0.10,
  pulseCount: 25, // Reduced from 40 to save updates and draws per frame
  pulseSpeedBase: 0.015,
};

// --- EASING & COLOR HELPERS ---
const cubicEaseInOut = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

const parseColor = (color: string) => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0]+hex[0], 16),
        parseInt(hex[1]+hex[1], 16),
        parseInt(hex[2]+hex[2], 16),
        1
      ];
    }
    return [
      parseInt(hex.slice(0,2), 16),
      parseInt(hex.slice(2,4), 16),
      parseInt(hex.slice(4,6), 16),
      1
    ];
  }
  const match = color.match(/[\d.]+/g);
  if (match && match.length >= 3) {
    return [parseFloat(match[0]), parseFloat(match[1]), parseFloat(match[2]), match.length >= 4 ? parseFloat(match[3]) : 1];
  }
  return [0,0,0,1];
};

const lerpColor = (c1: number[], c2: number[], t: number) => {
  return [
    c1[0] + (c2[0] - c1[0]) * t,
    c1[1] + (c2[1] - c1[1]) * t,
    c1[2] + (c2[2] - c1[2]) * t,
    c1[3] + (c2[3] - c1[3]) * t
  ];
};

const colorToString = (c: number[]) => `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${c[3]})`;

const parseTheme = (theme: any) => ({
  bgInner: parseColor(theme.bgInner),
  bgOuter: parseColor(theme.bgOuter),
  nodeColors: theme.nodeColors.map(parseColor),
  pulseColor: parseColor(theme.pulseColor),
  lineNormal: parseColor(theme.lineNormal),
  lineMixed: parseColor(theme.lineMixed),
  lineHub: parseColor(theme.lineHub),
  hubGlow: parseColor(theme.hubGlow),
});
const DARK_PARSED = parseTheme(THEME_CONFIG.dark);
const LIGHT_PARSED = parseTheme(THEME_CONFIG.light);

export function NeuralPortrait() {
  const { theme } = useTheme();
  const isDark = theme !== 'light';
  const isDarkRef = useRef(isDark);
  
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageUrl = DEFAULT_IMAGE;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let currentT = isDarkRef.current ? 1 : 0;
    let currentThemeStrings = isDarkRef.current ? THEME_CONFIG.dark : THEME_CONFIG.light;

    let nodes: any[] = [];
    let pulses: any[] = [];
    let animationFrameId: number;
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;
    let bgGradient: CanvasGradient | null = null;
    let sinCache: number[] = [];
    let cosCache: number[] = [];
    
    // --- VIEWPORT OPTIMIZATION ENGINE ---
    let isVisible = true;
    let observer: IntersectionObserver | null = null;
    if (containerRef.current) {
      observer = new IntersectionObserver((entries) => {
        const wasVisible = isVisible;
        isVisible = entries[0].isIntersecting;
        
        // If it just became visible again and is loaded, explicitly kickstart the engine
        if (!wasVisible && isVisible && nodes.length > 0) {
          lastFrameTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      }, { rootMargin: '100px', threshold: 0 }); // Pre-load slightly before scrolling in
      
      observer.observe(containerRef.current);
    }

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
        bgGradient.addColorStop(0, currentThemeStrings.bgInner);
        bgGradient.addColorStop(1, currentThemeStrings.bgOuter);
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- SCROLL ENGINE ---
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      const isDesktop = window.innerWidth >= 1024;
      
      let progress = 0;
      
      if (isDesktop) {
        // For laptop screens: Animation should exist between start to half scroll of the screen.
        progress = window.scrollY / (windowHeight / 2);
      } else {
        // For phones and tablets: The particle animation should happen when the element is visible on screen.
        // We use the element's position relative to the viewport.
        const rect = containerRef.current.getBoundingClientRect();
        
        // Start morphing when the element's top reaches 35% of the viewport height (so the full portrait is visible first)
        const startY = windowHeight * 0.35;
        // End morphing when the element's top scrolls off the top of the screen
        const endY = windowHeight * -0.2;
        
        progress = (startY - rect.top) / (startY - endY);
      }
      
      scrollProgressRef.current = Math.max(0, Math.min(1, progress));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- IMAGE PROCESSING (ADAPTIVE STIPPLING) ---
    const processImage = (img: HTMLImageElement) => {
      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return [];
      const procWidth = 600;
      const procHeight = 600 * (img.height / img.width);
      offscreen.width = procWidth;
      offscreen.height = procHeight;
      
      // 1. Draw original FIRST to capture exact alpha mask (for background-removed images)
      oCtx.drawImage(img, 0, 0, procWidth, procHeight);
      const alphaData = oCtx.getImageData(0, 0, procWidth, procHeight).data;

      // 2. Fill white background
      oCtx.fillStyle = '#ffffff';
      oCtx.fillRect(0, 0, procWidth, procHeight);

      // 3. Draw in grayscale for consistent luminance extraction
      oCtx.filter = 'grayscale(100%)';
      oCtx.drawImage(img, 0, 0, procWidth, procHeight);
      const imgData = oCtx.getImageData(0, 0, procWidth, procHeight).data;
      
      // Create a fast-lookup luma map for gradient (edge) detection
      const lumaMap = new Float32Array(procWidth * procHeight);
      lumaMap.fill(255); // Default to white (lightest background)
      
      let minLuma = 255;
      let maxLuma = 0;
      
      // Scan opaque region first to find dynamic luma range
      for (let y = 0; y < procHeight; y++) {
        for (let x = 0; x < procWidth; x++) {
          const idx = (y * procWidth + x) * 4;
          const alpha = alphaData[idx + 3];
          if (alpha >= 20) {
            const luma = imgData[idx]; // R channel is equivalent to grayscale luma
            lumaMap[y * procWidth + x] = luma;
            if (luma < minLuma) minLuma = luma;
            if (luma > maxLuma) maxLuma = luma;
          }
        }
      }
      
      const rawPoints: any[] = [];
      const step = SHARED_CONFIG.resolution;
      
      const getPixelLuma = (px: number, py: number) => {
        if (px < 0 || px >= procWidth || py < 0 || py >= procHeight) return 255;
        return lumaMap[py * procWidth + px];
      };

      for (let y = 2; y < procHeight - 2; y += step) {
        for (let x = 2; x < procWidth - 2; x += step) {
          
          // Extract Alpha. If pixel is transparent/background, SKIP IT.
          const alphaIdx = (y * procWidth + x) * 4 + 3;
          if (alphaData[alphaIdx] < 20) continue;
          
          const rawLuma = lumaMap[y * procWidth + x];
          
          // Perform dynamic contrast stretching
          const stretchedLuma = maxLuma > minLuma 
            ? ((rawLuma - minLuma) / (maxLuma - minLuma)) * 255 
            : rawLuma;
          
          // Calculate Sobel-style local gradients for facial feature outline detection
          const lumaLeft = maxLuma > minLuma ? ((getPixelLuma(x - step, y) - minLuma) / (maxLuma - minLuma)) * 255 : getPixelLuma(x - step, y);
          const lumaRight = maxLuma > minLuma ? ((getPixelLuma(x + step, y) - minLuma) / (maxLuma - minLuma)) * 255 : getPixelLuma(x + step, y);
          const lumaTop = maxLuma > minLuma ? ((getPixelLuma(x, y - step) - minLuma) / (maxLuma - minLuma)) * 255 : getPixelLuma(x, y - step);
          const lumaBottom = maxLuma > minLuma ? ((getPixelLuma(x, y + step) - minLuma) / (maxLuma - minLuma)) * 255 : getPixelLuma(x, y + step);
          
          const gx = lumaRight - lumaLeft;
          const gy = lumaBottom - lumaTop;
          const gradient = Math.sqrt(gx * gx + gy * gy);
          
          let darkness = 255 - stretchedLuma;

          // Check if it's an outline boundary of the person
          const leftAlpha = alphaData[(y * procWidth + (x - 2)) * 4 + 3];
          const rightAlpha = alphaData[(y * procWidth + (x + 2)) * 4 + 3];
          const topAlpha = alphaData[((y - 2) * procWidth + x) * 4 + 3];
          const bottomAlpha = alphaData[((y + 2) * procWidth + x) * 4 + 3];
          
          const isOutline = leftAlpha < 20 || rightAlpha < 20 || topAlpha < 20 || bottomAlpha < 20;
          const isFeatureEdge = gradient > 20; // Facial features (eyes, nose, lips, eyebrows)

          if (isOutline) {
            darkness = Math.max(darkness, 240); // Keep strong outer silhouette
          } else if (isFeatureEdge) {
            // Strong gradient = local feature contour (eyes, nose, mouth, moustache, etc.). Force tight stippling density.
            darkness = Math.max(darkness, 210 + (gradient / 255) * 45);
          } else {
            // Flat region (solid skin, flat hair or clothing).
            // Skip light skin areas entirely for a clean, high-contrast, high-performance stippled portrait.
            if (darkness < 110) continue;
            
            // Cap flat dark regions (hair/clothing, beard/moustache shadows) to keep them defined but avoid overflow.
            darkness = Math.min(darkness, 200);
          }

          rawPoints.push({
            nx: x / procWidth,
            ny: y / procHeight,
            score: darkness,
            luma: stretchedLuma
          });
        }
      }

      // ADAPTIVE SPATIAL FILTERING WITH FAST GRID-HASH
      // Sort by score so dark areas and edges get priority placement
      rawPoints.sort((a, b) => b.score - a.score);
      const imagePoints: any[] = [];
      
      const gridCols = Math.ceil(1 / SHARED_CONFIG.minNodeSpacing);
      const gridRows = Math.ceil(1 / SHARED_CONFIG.minNodeSpacing);
      const grid: any[][] = new Array(gridCols * gridRows).fill(null).map(() => []);

      for (const pt of rawPoints) {
        // Map score to required spacing. High score (dark) = tight packing. Low score (light) = sparse.
        // Use a quadratic curve (power of 2) to increase the density contrast between dark features and light skin
        const normalizedScore = pt.score / 255;
        const requiredSpacing = SHARED_CONFIG.minNodeSpacing + 
          (SHARED_CONFIG.maxNodeSpacing - SHARED_CONFIG.minNodeSpacing) * Math.pow(1 - normalizedScore, 2);
        const reqSpacingSq = requiredSpacing * requiredSpacing;

        let tooClose = false;
        const col = Math.floor(pt.nx / SHARED_CONFIG.minNodeSpacing);
        const row = Math.floor(pt.ny / SHARED_CONFIG.minNodeSpacing);
        const searchRadius = Math.ceil(requiredSpacing / SHARED_CONFIG.minNodeSpacing);

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

      const MAX_NODES = window.innerWidth < 768 ? 2400 : 6000; // Adjusted for performance testing (mobile: 2400, desktop: 6000)
      if (imagePoints.length > MAX_NODES) {
        // Uniformly downsample instead of truncating the lightest points
        // This ensures the face (lighter points) isn't completely deleted if the hair (dark points) fills the budget
        const step = imagePoints.length / MAX_NODES;
        const downsampled = [];
        for (let i = 0; i < MAX_NODES; i++) {
          downsampled.push(imagePoints[Math.floor(i * step)]);
        }
        return downsampled;
      }

      return imagePoints;
    };

    // --- TEXT PROCESSING ---
    const processText = () => {
      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d');
      if (!oCtx) return [];
      const tWidth = 800;
      const tHeight = 500;
      offscreen.width = tWidth;
      offscreen.height = tHeight;
      
      oCtx.fillStyle = '#000';
      oCtx.fillRect(0, 0, tWidth, tHeight);
      
      oCtx.font = 'bold 280px system-ui, -apple-system, sans-serif';
      oCtx.fillStyle = '#fff';
      oCtx.textAlign = 'center';
      oCtx.textBaseline = 'middle';
      oCtx.fillText(MORPH_TEXT, tWidth / 2, tHeight / 2);
      
      const imgData = oCtx.getImageData(0, 0, tWidth, tHeight).data;
      const textPoints: any[] = [];
      
      for (let y = 0; y < tHeight; y += 2) {
        for (let x = 0; x < tWidth; x += 2) {
          const i = (y * tWidth + x) * 4;
          if (imgData[i] > 128) {
             textPoints.push({
               nx: x / tWidth,
               ny: y / tHeight,
             });
          }
        }
      }

      // Shuffle text points so they are randomly assigned to image points
      textPoints.sort(() => Math.random() - 0.5);
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
      const hubCount = Math.floor(numNodes * SHARED_CONFIG.hubRatio);
      const hubSet = new Set(sortedIndices.slice(0, hubCount));
      
      for (let i = 0; i < numNodes; i++) {
        const pt = imagePoints[i];
        const tPt = textPoints[i % textPoints.length];
        const isHub = hubSet.has(i);
        
        // Halftone Shading: Darker areas get larger nodes, brighter areas get tiny nodes
        const lumaFactor = pt.luma !== undefined ? (1 - (pt.luma / 255)) : 0.5;
        const baseRadius = isHub ? (1.5 + lumaFactor * 1.5) : (0.6 + lumaFactor * 1.0);
        
        nodes.push({
          id: i,
          startX: pt.nx,
          startY: pt.ny,
          targetX: tPt.nx + (Math.random() - 0.5) * 0.005,
          targetY: tPt.ny + (Math.random() - 0.5) * 0.005,
          x: pt.nx,
          y: pt.ny,
          z: Math.random(),
          isHub: isHub,
          radius: baseRadius, 
          colorIndex: Math.floor(Math.random() * THEME_CONFIG.dark.nodeColors.length),
          connections: [], 
        });
      }

      const connDistSq = SHARED_CONFIG.connectionDistance * SHARED_CONFIG.connectionDistance;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const distances = [];
        
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const nodeB = nodes[j];
          const dx = nodeA.startX - nodeB.startX;
          const dy = nodeA.startY - nodeB.startY;
          const distSq = dx*dx + dy*dy;
          
          if (distSq < connDistSq) {
            const dist = Math.sqrt(distSq);
            const weight = nodeB.isHub ? dist * 0.5 : dist;
            distances.push({ id: j, dist, weight });
          }
        }
        
        distances.sort((a, b) => a.weight - b.weight);
        const connectionsCount = nodeA.isHub ? SHARED_CONFIG.maxConnections : Math.min(SHARED_CONFIG.maxConnections - 2, distances.length);
        
        nodeA.connections = distances.slice(0, connectionsCount).map(d => d.id);
      }

      sinCache = new Array(nodes.length).fill(0);
      cosCache = new Array(nodes.length).fill(0);

      pulses = [];
      for (let i = 0; i < SHARED_CONFIG.pulseCount; i++) {
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
        speed: SHARED_CONFIG.pulseSpeedBase + Math.random() * 0.02,
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
      // MASSIVE GPU OPTIMIZATION: If strictly off-screen, completely pause math/drawing!
      if (!isVisible) {
        cancelAnimationFrame(animationFrameId);
        return; 
      }

      if (time - lastFrameTime < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = time;
      frameCount++;

      const targetT = isDarkRef.current ? 1 : 0;
      if (Math.abs(currentT - targetT) > 0.001) {
        currentT += (targetT - currentT) * 0.05;
        
        currentThemeStrings = {
          bgInner: colorToString(lerpColor(LIGHT_PARSED.bgInner, DARK_PARSED.bgInner, currentT)),
          bgOuter: colorToString(lerpColor(LIGHT_PARSED.bgOuter, DARK_PARSED.bgOuter, currentT)),
          nodeColors: LIGHT_PARSED.nodeColors.map((lc, i) => colorToString(lerpColor(lc, DARK_PARSED.nodeColors[i], currentT))),
          pulseColor: colorToString(lerpColor(LIGHT_PARSED.pulseColor, DARK_PARSED.pulseColor, currentT)),
          lineNormal: colorToString(lerpColor(LIGHT_PARSED.lineNormal, DARK_PARSED.lineNormal, currentT)),
          lineMixed: colorToString(lerpColor(LIGHT_PARSED.lineMixed, DARK_PARSED.lineMixed, currentT)),
          lineHub: colorToString(lerpColor(LIGHT_PARSED.lineHub, DARK_PARSED.lineHub, currentT)),
          hubGlow: colorToString(lerpColor(LIGHT_PARSED.hubGlow, DARK_PARSED.hubGlow, currentT)),
          composite: currentT > 0.5 ? 'screen' : 'source-over' as GlobalCompositeOperation,
          bgFallback: currentT > 0.5 ? THEME_CONFIG.dark.bgFallback : THEME_CONFIG.light.bgFallback,
          textColor: currentT > 0.5 ? THEME_CONFIG.dark.textColor : THEME_CONFIG.light.textColor,
        };
        
        bgGradient = ctx.createRadialGradient(
          canvasWidth / 2, canvasHeight / 2, 0,
          canvasWidth / 2, canvasHeight / 2, Math.max(canvasWidth, canvasHeight) * 0.8
        );
        if (bgGradient) {
          bgGradient.addColorStop(0, currentThemeStrings.bgInner);
          bgGradient.addColorStop(1, currentThemeStrings.bgOuter);
        }
      }

      if (bgGradient) {
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      }
      
      const scroll = scrollProgressRef.current;
      let morphFactor = scroll; // We already mapped progress from 0 to 1
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
        
        const parallaxOffset = (scroll - 0.5) * node.z * canvasHeight * SHARED_CONFIG.parallaxStrength;
        
        node.currentX = currentX + driftX;
        node.currentY = currentY + driftY - parallaxOffset; 
      });

      ctx.globalCompositeOperation = currentThemeStrings.composite;
      const maxDistSq = Math.pow(canvasWidth * 0.12, 2);

      // 1-3. Draw all lines in a single pass using Path2D for performance
      const pathNormal = new Path2D();
      const pathMixed = new Path2D();
      const pathHub = new Path2D();

      nodes.forEach(nodeA => {
        if (nodeA.z < 0.15) return;
        nodeA.connections.forEach((targetId: number) => {
          const nodeB = nodes[targetId];
          if (nodeB.z < 0.15) return;

          const dx = nodeA.currentX - nodeB.currentX;
          const dy = nodeA.currentY - nodeB.currentY;
          if (dx*dx + dy*dy < maxDistSq) {
            if (!nodeA.isHub && !nodeB.isHub) {
              pathNormal.moveTo(nodeA.currentX, nodeA.currentY);
              pathNormal.lineTo(nodeB.currentX, nodeB.currentY);
            } else if (nodeA.isHub !== nodeB.isHub) {
              pathMixed.moveTo(nodeA.currentX, nodeA.currentY);
              pathMixed.lineTo(nodeB.currentX, nodeB.currentY);
            } else {
              pathHub.moveTo(nodeA.currentX, nodeA.currentY);
              pathHub.lineTo(nodeB.currentX, nodeB.currentY);
            }
          }
        });
      });

      // Draw normal lines (Node to Node)
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = currentThemeStrings.lineNormal;
      ctx.stroke(pathNormal);

      // Draw mixed lines (Hub to Node)
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = currentThemeStrings.lineMixed;
      ctx.stroke(pathMixed);

      // Draw Hub lines (Hub to Hub)
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = currentThemeStrings.lineHub;
      ctx.stroke(pathHub);

      // 4. Draw Pulses
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
        ctx.fillStyle = currentThemeStrings.pulseColor;
        ctx.fill();
      });

      // 5. Draw Nodes (Batched by color)
      currentThemeStrings.nodeColors.forEach((color, cIdx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        nodes.forEach(node => {
          if (node.z < 0.15 || node.colorIndex !== cIdx || node.isHub) return;
          ctx.moveTo(node.currentX + node.radius, node.currentY);
          ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
        });
        ctx.fill();
      });

      // 6. Draw Hubs with fake glow
      ctx.fillStyle = currentThemeStrings.hubGlow;
      ctx.beginPath();
      nodes.forEach(node => {
        if (node.z < 0.15 || !node.isHub) return;
        ctx.moveTo(node.currentX + node.radius * 2.5, node.currentY);
        ctx.arc(node.currentX, node.currentY, node.radius * 2.5, 0, Math.PI * 2);
      });
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      nodes.forEach(node => {
        if (node.z < 0.15 || !node.isHub) return;
        ctx.moveTo(node.currentX + node.radius, node.currentY);
        ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
      });
      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    const img = new Image();
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
      console.error("Failed to load image from", imageUrl);
      setError("Failed to load neural image.");
    };
    img.src = imageUrl;

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (observer) observer.disconnect();
    };
  }, [imageUrl]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full rounded-3xl overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden transition-colors duration-1000" style={{ backgroundColor: isDark ? THEME_CONFIG.dark.bgFallback : THEME_CONFIG.light.bgFallback }}>
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-red-400 font-mono text-sm z-50 bg-black/50 backdrop-blur-sm">
            <p className="mb-4">{error}</p>
          </div>
        )}
        
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-mono tracking-widest text-xs uppercase transition-colors duration-1000" style={{ color: isDark ? THEME_CONFIG.dark.textColor : THEME_CONFIG.light.textColor }}>Synthesizing Neural Map...</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] pointer-events-none animate-pulse text-center w-full transition-colors duration-1000" style={{ color: isDark ? THEME_CONFIG.dark.textColor : THEME_CONFIG.light.textColor, opacity: 0.6 }}>
          SCROLL TO INITIATE MORPH SEQUENCE
        </div>
      </div>
    </div>
  );
}
