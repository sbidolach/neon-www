module.exports = (value, dflt) => {
  if (value === undefined) {
    return dflt
  } else {
    return value === 'true' || value === true
  }
}
