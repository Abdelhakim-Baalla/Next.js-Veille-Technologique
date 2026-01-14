'use client'

export function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 120, top: '10%', left: '5%', opacity: 0.04, duration: 8 },
    { type: 'square', size: 80, top: '20%', right: '10%', opacity: 0.03, duration: 10 },
    { type: 'circle', size: 200, bottom: '15%', left: '15%', opacity: 0.03, duration: 7 },
    { type: 'square', size: 100, top: '60%', right: '5%', opacity: 0.04, duration: 9 },
    { type: 'circle', size: 60, top: '40%', left: '80%', opacity: 0.05, duration: 6 },
    { type: 'square', size: 150, bottom: '10%', right: '20%', opacity: 0.03, duration: 11 },
  ]

  return (
    <>
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`floating-shape ${shape.type === 'circle' ? 'shape-circle' : 'shape-square'}`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            opacity: shape.opacity,
            animation: `${index % 2 === 0 ? 'float' : 'floatAlt'} ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}
    </>
  )
}
