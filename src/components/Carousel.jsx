import { useState, useEffect, useCallback } from 'react'

const images = [
  { src: 'src/assets/Banner_1.jpg', alt: 'Banner 1' },
  { src: 'src/assets/Banner_2.jpg', alt: 'Banner 2' },
  { src: 'src/assets/Banner_3.jpg', alt: 'Banner 3' },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(
    () => setCurrent(i => (i - 1 + images.length) % images.length),
    []
  )
  const next = useCallback(
    () => setCurrent(i => (i + 1) % images.length),
    []
  )

  useEffect(() => {
    if (paused || images.length <= 1) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-xl"
      style={{ aspectRatio: '3 / 1' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <img
        src={images[current].src}
        alt={images[current].alt}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/35 to-transparent pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7l4-4" stroke="#0072C4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Próximo"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 hover:bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="#0072C4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-6 h-2 bg-white shadow'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
