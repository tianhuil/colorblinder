export const generateRGB = () => ({
  r: Math.floor(Math.random() * 255),
  g: Math.floor(Math.random() * 255),
  b: Math.floor(Math.random() * 255),
})

export const mutateRGB = ({ r, g, b }) => ({
  r: r + Math.floor(Math.random() * 20) + 10,
  g: g + Math.floor(Math.random() * 20) + 10,
  b: b + Math.floor(Math.random() * 20) + 10,
})

export const white = '#ecf0f1'
