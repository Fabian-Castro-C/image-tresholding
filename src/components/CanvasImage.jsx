import { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { drawCanvas } from "../services/drawCanvas"

/**
 * Component to render an image on a canvas based on a height data matrix.
 * @param {Object} props
 * @param {number[][]} props.data - 2D array containing height data.
 * @param {Object} props.metadata - Metadata about the image (e.g., width, height).
 */
const CanvasImage = ({ data, metadata, colormap }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (data && metadata) {
      const canvas = canvasRef.current
      drawCanvas( { canvas, data, colormap } )
    }
  }, [data, metadata, colormap])

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
      }}
    ></canvas>
  )
}

CanvasImage.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  metadata: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  colormap: PropTypes.func.isRequired,
}

export default CanvasImage