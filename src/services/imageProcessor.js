import { convertToMeters } from "./unitConverter"

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
  
  return { metadata, data }
}
