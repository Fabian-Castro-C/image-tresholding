import { useState } from "react"

export function useCursorTooltip(canvas, data, metadata) {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    z: 0,
    position: { x: 0, y: 0 },
    width: 0,
    height: 0,
  })

  const handleMouseMove = (event) => {
    if (!canvas || !data || !metadata || data.length === 0 || data[0].length === 0) return

    const rect = canvas.getBoundingClientRect()

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Conversión de coordenadas de píxeles a unidades físicas
    const dataX = (mouseX / rect.width) * metadata.width
    const dataY = (mouseY / rect.height) * metadata.height

    // Conversión de coordenadas físicas a índices de la matriz
    const indexX = Math.floor((mouseX / rect.width) * data[0].length)
    const indexY = Math.floor((mouseY / rect.height) * data.length)

    if (indexX >= 0 && indexX < data[0].length && indexY >= 0 && indexY < data.length) {
      const zValue = data[indexY][indexX]

      setTooltip({
        visible: true,
        x: dataX,
        y: dataY,
        z: zValue,
        position: { x: event.clientX, y: event.clientY },
        width: metadata.width,
        height: metadata.height,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }))
  }

  return { tooltip, handleMouseMove, handleMouseLeave }
}

export default useCursorTooltip
