import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Stream {
  x: number
  y: number
  speed: number
  width: number
  offset: number
}

const STREAM_COUNT = 6

const WaterStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamsRef = useRef<Stream[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize for device pixel ratio
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize streams
    streamsRef.current = Array.from({ length: STREAM_COUNT }).map((_, i) => ({
      x: window.innerWidth * 0.5 + i * 18 - 50,
      y: Math.random() * window.innerHeight,
      speed: 0.4 + Math.random() * 0.6,
      width: 6 + Math.random() * 4,
      offset: Math.random() * Math.PI * 2
    }))

    const state = { time: 0 }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.globalAlpha = 0.35
      ctx.strokeStyle = '#6EC6FF'
      ctx.lineCap = 'round'

      streamsRef.current.forEach(stream => {
        ctx.beginPath()
        ctx.lineWidth = stream.width

        const wave = Math.sin(state.time + stream.offset) * 12

        ctx.moveTo(stream.x + wave, stream.y)
        ctx.lineTo(stream.x - wave, window.innerHeight)

        ctx.stroke()

        stream.y += stream.speed
        if (stream.y > window.innerHeight) {
          stream.y = -200
        }
      })
    }

    gsap.ticker.add(draw)
    gsap.to(state, {
      time: Math.PI * 2,
      repeat: -1,
      duration: 6,
      ease: 'none'
    })

    return () => {
      gsap.ticker.remove(draw)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

export default WaterStream
