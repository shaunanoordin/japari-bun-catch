const SHADOW_X = 2
const SHADOW_Y = 2

export function fillTextWithShadow (c2d, text, x, y, colour = '#ee9944', shadow = '#fff') {
  c2d.fillStyle = shadow
  c2d.fillText(text, x + SHADOW_X, y + SHADOW_Y)
  c2d.fillStyle = colour
  c2d.fillText(text, x, y)
}