// "use client"

// import type React from "react"

// import { useEffect } from "react"

// export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     let lenis: any

//     const initLenis = async () => {
//       const Lenis = (await import("lenis")).default

//       lenis = new Lenis({
//         duration: 1.2,
//         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         direction: "vertical",
//         gestureDirection: "vertical",
//         smooth: true,
//         mouseMultiplier: 1,
//         smoothTouch: false,
//         touchMultiplier: 2,
//         infinite: false,
//       })

//       function raf(time: number) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//       }

//       requestAnimationFrame(raf)
//     }

//     initLenis()

//     return () => {
//       if (lenis) {
//         lenis.destroy()
//       }
//     }
//   }, [])

//   return <>{children}</>
// }
