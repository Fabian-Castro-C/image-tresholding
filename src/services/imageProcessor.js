import { convertToMeters } from "./unitConverter"

/**
 * Sets the minimum value of a matrix to zero.
 * @param {number[][]} data - The matrix to process.
 * @returns {number[][]} - The processed matrix.
 */
export function setZeroReference(data) {
  const dataCopy = [...data]
  let min = Infinity
  for (let row of dataCopy) {
    for (let value of row) {
      if (value < min) {
        min = value
      }
    }
  }
  for (let row of dataCopy) {
    for (let i = 0; i < row.length; i++) {
      row[i] -= min
    }
  }
  return dataCopy
}

/**
 * Parse an ASCII file containing AFM image data.
 * @param {string} fileContent - The ASCII data to parse.
 * @returns {Object} - The parsed image data including width, height and data matrix.
 */
export function parseAsciiFile(fileContent) {
  const lines = fileContent.split('\n')
  const metadata = {}
  const data = []

  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      // Parse metadata
      const parts = line.split(':')
      if (parts.length < 2) return // Saltar líneas mal formateadas
      const value = parts[1].trim()

      try {
        if (index === 0) {
          metadata.channel = value
        } else if (index === 1) {
          metadata.width = convertToMeters(value)
        } else if (index === 2) {
          metadata.height = convertToMeters(value)
        } else if (index === 3) {
          metadata.zUnit = convertToMeters(value)
        }
      } catch (err) {
        throw new Error(`Error procesando metadata en la línea ${index + 1}: ${err.message}`)
      }
    } else {
      // Parse data
      if (line.trim() === '') return // Ignorar líneas vacías
      const numbers = line.split('	').map((number) => parseFloat(number))

      if (numbers.some(isNaN)) {
        throw new Error(`Error procesando datos numéricos en la línea ${index + 1}`)
      }

      data.push(numbers)
    }
  })
  const dataSetReference = setZeroReference(data)
  return { metadata, data: dataSetReference }
}

