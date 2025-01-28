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

  lines.forEach( (line, index) => {
    if (line.startsWith('#')) {
      // Parse metadata
      if (index === 0) {
        metadata.channel = line.split(':')[1].trim()
      } else if (index === 1) {
        metadata.width = convertToMeters(line.split(':')[1].trim())
      } else if (index === 2) {
        metadata.height = convertToMeters(line.split(':')[1].trim())
      } else if (index === 3) {
        metadata.zUnit = convertToMeters(line.split(':')[1].trim())
      }
    }
    else {
      // Parse data
      data.push(line.split(' ').map(number => parseFloat(number)))
    }
  })
  
  return { metadata, data }
}