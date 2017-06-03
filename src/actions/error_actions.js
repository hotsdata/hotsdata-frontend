
function createError(errorString) {
  return {
    type: CREATE_ERROR,
    payload: errorString
  }
}
