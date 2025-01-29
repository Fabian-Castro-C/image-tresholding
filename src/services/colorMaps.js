
/**
 * Returns a value between 0 and 255 for the given value.
 * @param {number} value - The value to convert.
 * @returns {number} - The value between 0 and 255.
 */
function to8BitColor(value) {
  return Math.floor(value * 255)
}

/** 
 * Returns a grayscale color for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The grayscale color. 
 */
export function grayscale(value) {
  const color = to8BitColor(value)
  return [color, color, color, 255]
}

/**
 * Returns a color from the Jet colormap for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The color from the Jet colormap.
 */
export function colorMapJet(value) {
  let r, g, b
  
  if (value < 0.125) {
    // De azul oscuro a azul
    r = 0
    g = 0
    b = 0.5 + value * 4  // sube de 0.5 a 1.0
  } else if (value < 0.375) {
    // De azul a cian
    r = 0
    g = (value - 0.125) * 4 // sube de 0 a 1
    b = 1
  } else if (value < 0.625) {
    // De cian a amarillo
    r = (value - 0.375) * 4 // sube de 0 a 1
    g = 1
    b = 1 - (value - 0.375) * 4 // baja de 1 a 0
  } else if (value < 0.875) {
    // De amarillo a rojo
    r = 1
    g = 1 - (value - 0.625) * 4 // baja de 1 a 0
    b = 0
  } else {
    // De rojo a rojo oscuro (se oscurece un poco más)
    r = 1 - (value - 0.875) * 4 * 0.5 // baja un poco el rojo
    g = 0
    b = 0
  }
  
  return [r, g, b, 1].map(to8BitColor)
}

/**
 * Returns a color from the HSV colormap for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The color from the HSV colormap.
 */
export function colorMapHSV(value) {
  value = Math.max(0, Math.min(1, value))
  
  let H = 360 * value // 0..360
  let S = 1
  let V = 1
  
  let C = V * S 
  let H_ = H / 60
  let X = C * (1 - Math.abs((H_ % 2) - 1))
  let m = V - C
  
  let r_, g_, b_
  
  if (0 <= H_ && H_ < 1)      [r_, g_, b_] = [C,  X,  0]
  else if (1 <= H_ && H_ < 2) [r_, g_, b_] = [X,  C,  0]
  else if (2 <= H_ && H_ < 3) [r_, g_, b_] = [0,  C,  X]
  else if (3 <= H_ && H_ < 4) [r_, g_, b_] = [0,  X,  C]
  else if (4 <= H_ && H_ < 5) [r_, g_, b_] = [X,  0,  C]
  else                        [r_, g_, b_] = [C,  0,  X]
  
  let R = r_ + m
  let G = g_ + m
  let B = b_ + m
  
  return [R, G, B, 1].map(to8BitColor)
}

/**
 * Returns a color from the Hot colormap for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The color from the Hot colormap.
 */
export function colorMapHot(value) {
  value = Math.max(0, Math.min(1, value))
  
  let r, g, b
  
  if (value < 1/3) {
    // sube R de 0 a 1 en el primer tercio
    r = 3 * value
    g = 0
    b = 0
  } else if (value < 2/3) {
    // R = 1, sube G de 0 a 1 en el segundo tercio
    r = 1
    g = 3 * (value - 1/3)
    b = 0
  } else {
    // R=1, G=1, sube B de 0 a 1 en el último tercio
    r = 1
    g = 1
    b = 3 * (value - 2/3)
  }
  
  return [r, g, b, 1].map(to8BitColor)
}

/**
 * Returns a color from the Cool colormap for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The color from the Cool colormap.
 */
export function colorMapCool(value) {
  value = Math.max(0, Math.min(1, value))
  return [value, 1 - value, 1, 1].map(to8BitColor)
}

/**
 * Returns a color from the Spring colormap for the given value.
 * @param {number} value - The value to convert.
 * @returns {number[]} - The color from the Spring colormap.
 */
export function colorMapViridis(value) {
  value = Math.max(0, Math.min(1, value))

  let r =  0.267 + value*( -0.053 + value*( -0.340 + value*1.176 ))
  let g =  0.004 + value*(  0.479 + value*(  1.061 + value*(-1.629)))
  let b =  0.329 + value*(  1.565 + value*( -3.144 + value*2.003 ))
  
  return [r, g, b, 1].map(to8BitColor)
}
