/**
 * Draw the given data on the given canvas using the given colormap.
 * @param {Object} options - The options object.
 * @param {HTMLCanvasElement} options.canvas - The canvas element to draw on.
 * @param {number[][]} options.data - The data to draw.
 * @param {function} options.colormap - The colormap function to use.
 * @returns {void}
 */
export function drawCanvas({ canvas, data, colormap }) {
  const context = canvas.getContext("2d")

  const numRows = data.length
  const numCols = data[0].length

  // Set canvas dimensions
  canvas.width = numCols
  canvas.height = numRows

  // Calculate the min and max height for normalization
  let minVal = Infinity
  let maxVal = -Infinity
  console.log(minVal)

  for (const row of data) {
    for (const value of row) {
      if (value < minVal) minVal = value
      if (value > maxVal) maxVal = value
    }
  }

  // Draw the image pixel by pixel
  const imageData = context.createImageData(numCols, numRows)
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const value = data[y][x]
      const normalizedValue = (value - minVal) / (maxVal - minVal) // Normalize to [0, 1]
      
      const index = (y * numCols + x) * 4
      const [r, g, b, a] = colormap(normalizedValue)

      imageData.data[index] = r
      imageData.data[index + 1] = g
      imageData.data[index + 2] = b
      imageData.data[index + 3] = a
    }
  }

  context.putImageData(imageData, 0, 0)
}