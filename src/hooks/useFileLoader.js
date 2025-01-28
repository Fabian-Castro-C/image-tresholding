import { useState } from "react"
import { parseAsciiFile } from "../services/imageProcessor"

/**
 * Custom hook to load and parse an ASCII file.
 * @return {Object} - Contains functions to load the file and parsed data.
 */
export default function useFileLoader() {
  const [parsedData, setParsedData] = useState(null)
  const [error, setError] = useState(null)

  /**
   * Load and parse an ASCII file.
   * @param {string} file_path - The file to load.
   */
  async function loadFile(file_path) {
    try {
      const fileContent = await fetch(file_path)
      const parsedData = parseAsciiFile(fileContent)
      setParsedData(parsedData)
    } catch (error) {
      setError(error)
    }
  }

  return { parsedData, error, loadFile }
}