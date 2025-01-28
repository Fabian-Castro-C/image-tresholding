import { useEffect, useMemo } from "react"
import CanvasImage from "./components/CanvasImage"
import useFileLoader from "./hooks/useFileLoader"

const IMAGE_PATH = "../public/example.txt"

function App() {
  const { parsedData, error, loadFile } = useFileLoader()

  useEffect(() => {
    const fetchData = async () => {
      await loadFile(IMAGE_PATH)
    }

    fetchData()
  }, [loadFile])

  const colormap = useMemo(() => (value) => {
    const gray = Math.floor(value * 255)
    return [gray, gray, gray, 255]
  }, [])

  return (
    <>
      <h1>Image Thresholding App</h1>
      {error && <p>Error: {error}</p>}
      {parsedData && <CanvasImage 
        data={parsedData.data} 
        metadata={parsedData.metadata} 
        colormap={colormap}
      />}
    </>
  )
}

export default App
