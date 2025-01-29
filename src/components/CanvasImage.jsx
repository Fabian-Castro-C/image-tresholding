import { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { drawCanvas } from "../services/drawCanvas"
import useCursorTooltip from "../hooks/useCursorTooltip"
import CursorTooltip from "./CursorTooltip"
import "../styles/CanvasImage.css"

/**
 * Component to render an image on a canvas based on a height data matrix.
 * @param {Object} props
 * @param {number[][]} props.data - 2D array containing height data.
 * @param {Object} props.metadata - Metadata about the image (e.g., width, height).
 */
const CanvasImage = ({ data, metadata, colormap }) => {
  const canvasRef = useRef(null)
  const { tooltip, handleMouseMove, handleMouseLeave } = useCursorTooltip(canvasRef.current, data, metadata)

  useEffect(() => {
    if (data && metadata) {
      const canvas = canvasRef.current
      drawCanvas( { canvas, data, colormap } )
    }
  }, [data, metadata, colormap])

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="canvas-image"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      ></canvas>
      {tooltip.visible && (
        <CursorTooltip
          x={tooltip.x}
          y={tooltip.y}
          z={tooltip.z}
          visible={tooltip.visible}
          position={tooltip.position}
          width={tooltip.width}
          height={tooltip.height}
        />
      )}
    </div>
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