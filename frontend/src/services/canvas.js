// services/canvas.js
let canvas = null
let ctx = null

export function createCanvas(width, height) {
  canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d')
  return canvas
}

export async function drawFrame(frameImage) {
  const img = new Image()
  img.src = frameImage
  await img.decode()
  ctx.drawImage(img, 0, 0)
}

export async function drawPhoto(photo, slot) {
  const img = new Image()
  img.src = photo
  await img.decode()
  ctx.drawImage(
    img,
    slot.x,
    slot.y,
    slot.width,
    slot.height
  )
}

export function exportCanvas() {
  return canvas.toDataURL('image/png')
}

export function destroyCanvas() {
  canvas = null
  ctx = null
}
