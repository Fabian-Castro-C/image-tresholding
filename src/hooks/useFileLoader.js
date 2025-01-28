import { useState, useCallback } from "react"
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
  const loadFile = useCallback(async (file_path) => {
    try {
      const fileContent = await fetch(file_path).then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar el archivo: ${response.statusText}`)
        }
        return response.text()
      })

      setParsedData(parseAsciiFile(fileContent))
      setError(null)
    } catch (err) {
      setError(err.message || "Error desconocido")
      setParsedData(null) // Limpiar datos previos en caso de error
    }
  }, [])

  return { parsedData, error, loadFile }
}