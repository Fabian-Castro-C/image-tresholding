import { useEffect, useMemo } from "react"
import CanvasImage from "./components/CanvasImage"
import useFileLoader from "./hooks/useFileLoader"
import { colorMapHot } from "./services/colorMaps"

const IMAGE_PATH = "../public/example.txt"

function App() {
  const { parsedData, error, loadFile } = useFileLoader()

  useEffect(() => {
    const fetchData = async () => {
      await loadFile(IMAGE_PATH)
    }

    fetchData()
  }, [loadFile])

  const colormap = useMemo(() => colorMapHot, [])

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
