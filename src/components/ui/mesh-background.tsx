import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState, memo } from "react"
import { useTheme } from "next-themes"

interface MeshBackgroundProps {
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
}

// Global ambient background version of the Shader 
export const MeshBackground = memo(function MeshBackground({
  distortion = 0.4, // Ambient background distortion
  swirl = 0.4,
  speed = 0.15, // Extremely slow to look cinematic and minimize redraw calculations
  offsetX = 0.08,
}: MeshBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)
  
  // Properly hook into next-themes for accurate dark/light palette swapping
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true)

    const update = () => {
      // MASSIVE OPTIMIZATION: Render WebGL surface at ~40% resolution scaling. 
      // The CSS wrapper forces the canvas to blow back up to 100vw, creating a buttery 
      // smooth glowing blur while shredding the heavy GPU fill-rate requirement by 84%.
      // Result: Flawless smooth scrolling without battery drain.
      setDimensions({
        width: Math.floor(window.innerWidth * 0.4),
        height: Math.floor(window.innerHeight * 0.4),
      })
    }

    update()
    window.addEventListener("resize", update, { passive: true })
    
    return () => {
      window.removeEventListener("resize", update)
    }
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme !== 'light';

  // Dynamic Theme Mapping matching your AI/ML engineer brand aesthetic.
  // Dark: Deep galactic violets and purples. Light: Soft lavenders.
  const activeColors = isDark 
    ? ["#10002b", "#240046", "#3c096c", "#5a189a", "#7b2cbf", "#9d4edd"]
    : ["#faf5ff", "#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#b185db"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {mounted && dimensions.width > 0 && (
        <div 
          className="absolute top-0 left-0"
          style={{ 
            opacity: isDark ? 0.5 : 0.7,
            // Physically bound the wrapper to the throttled render size
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            // Use hardware-accelerated CSS transform to stretch it perfectly back to 100% viewport 
            transform: `scale(${1 / 0.4})`, 
            transformOrigin: 'top left',
          }} 
        >
          <MeshGradient
            width={dimensions.width}
            height={dimensions.height}
            colors={activeColors}
            distortion={distortion}
            swirl={swirl}
            grainMixer={0} 
            grainOverlay={0}
            speed={speed}
            offsetX={offsetX}
          />
        </div>
      )}
    </div>
  )
})
