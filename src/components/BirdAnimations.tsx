import gsap from 'gsap'

export interface BirdElements {
  feather_tail: SVGGElement
  feather_top: SVGGElement
  eye: SVGElement
  beak: SVGPathElement
  feather_under: SVGGElement
  feather_breast: SVGGElement
}

export const createBirdTimeline = (els: BirdElements) => {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out',
                repeat: -1,
                delay: 2,
                repeatDelay: 7,
                yoyo: true
     }

  })

  tl.from(els.feather_tail, {
    rotation: -10,
    transformOrigin: 'top left',
    ease: 'power2.inOut',
    duration: 1,
    repeatDelay: 6,

  })
  .from(els.feather_top, {
    rotation: 12,
    transformOrigin: 'top left',
    ease: 'power1.inOut',
    duration: 1.5
  },)
  .from(els.beak, {
    y: 6,
    opacity: 0,
    duration: 1.5
  })
  .from(els.feather_breast, {
    y: 2,
    stagger: 0.05,
    duration: 1
  })
    .from(els.feather_under, {
    y: 8,
    // opacity: ,
    stagger: 0.1,
    ease: 'sine.inOut',
    duration: 1
  })

gsap.fromTo(
  els.eye,
  { scaleY: 0.1 },
  {
    scaleY: 1,
    duration: 0.1,
    // yoyo: true,
    repeat: -1,
    repeatDelay: 3,
    transformOrigin: 'center'
  }
)


  return tl
}
