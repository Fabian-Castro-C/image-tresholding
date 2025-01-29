const unitMultipliers = {
  m: 1,
  cm: 1e-2,
  mm: 1e-3,
  um: 1e-6,
  "µm": 1e-6,
  nm: 1e-9,
  "Å": 1e-10,
  "A": 1e-10,
  pm: 1e-12,
}

/**
 * Converts a value with a unit to a float in meters.
 * @param {string} valueWithUnit - The value to convert.
 * @returns {number} - The value in meters.
 */
export function convertToMeters(valueWithUnit) {
  const match = valueWithUnit.match(/^([\d.]+)?\s*([a-zA-ZµÅ]+)/)

  if (!match) {
    throw new Error(`Invalid value: ${valueWithUnit}`)
  }

  const [_, value, unit] = match
  const multiplier = unitMultipliers[unit]

  if (!multiplier) {
    throw new Error(`Invalid unit: ${unit}`)
  }

  // If no value is provided, assume it is 1.
  const numericValue = value ? parseFloat(value) : 1

  return numericValue * multiplier
}

/**
 * Converts a value in meters to a value with a unit.
 * @param {number} value - The value to convert.
 * @returns {Object} - An object containing the value and unit.
 */
export function convertToUnit(val, scale) {
  for (const unit in unitMultipliers) {
    const multiplier = unitMultipliers[unit]
    const convertedValue = scale / multiplier

    if (Math.abs(convertedValue) >= 1) {
      return { value: val/multiplier, unit }
    }
  }
  return {value: 0, unit: ''}
}