export function applyFilterToImage(imageSrc, cssFilter) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = imageSrc

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      ctx.filter = cssFilter
      ctx.drawImage(img, 0, 0)

      resolve(canvas.toDataURL('image/png'))
    }
  })
}
