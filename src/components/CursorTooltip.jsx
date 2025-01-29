import PropTypes from "prop-types"
import "../styles/CursorTooltip.css"
import { convertToUnit } from "../services/unitConverter"

const CursorTooltip = ({ x, y, z, visible, position, width, height }) => {
  const xyz = {
    x: x !== undefined && x !== null ? convertToUnit(x, width) : { value: 0, unit: "" },
    y: y !== undefined && y !== null ? convertToUnit(y, height) : { value: 0, unit: "" },
    z: z !== undefined && z !== null ? convertToUnit(z, z) : { value: 0, unit: "" },
  }

  return (
    visible && (
      <div
        className={`cursor-tooltip ${!visible ? "hidden" : ""}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {x !== undefined && x !== null && 
          <p><strong>x: </strong>{xyz.x.value.toFixed(2)} {xyz.x.unit}</p>}
        {y !== undefined && y !== null && 
          <p><strong>y: </strong>{xyz.y.value.toFixed(2)} {xyz.y.unit}</p>}
        {z !== undefined && z !== null && 
          <p><strong>z: </strong>{xyz.z.value.toFixed(2)} {xyz.z.unit}</p>}
      </div>
    )
  )
}

CursorTooltip.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  visible: PropTypes.bool.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default CursorTooltip
