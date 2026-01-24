import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { createBirdTimeline } from './BirdAnimations'
import birdSvg from '../assets/Kereru.svg?raw'

const Bird = () => {
  const svgRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!svgRef.current) return

    const feather_tail = svgRef.current.querySelector('#feather_tail') as SVGGElement
    const feather_top = svgRef.current.querySelector('#feather_top') as SVGGElement
    const eye = svgRef.current.querySelector('#eye') as SVGElement
    const beak = svgRef.current.querySelector('#beak') as SVGPathElement
    const feather_breast = svgRef.current.querySelector('#feather_breast') as SVGGElement
    const feather_under = svgRef.current.querySelector('#feather_under') as SVGGElement


    createBirdTimeline({
      feather_tail,
      feather_top,
      eye,
      beak,
      feather_breast,
      feather_under

    })
  }, [])

  return (
    <div
      dangerouslySetInnerHTML={{ __html: birdSvg }}
      ref={svgRef}
    />
  )
}

export default Bird
