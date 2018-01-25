import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const BATCH_UPDATED = 'BATCH_UPDATED'

const api = new API()

export default (batchId, updates = {}) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/batches/${batchId}`, updates)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: BATCH_UPDATED, payload: result.body })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}

export const updateEvaluation = (batchId, student) => {
  return dispatch => {
    const path = `/batches/${batchId}/students`
    dispatch({ type: APP_LOADING })

    api.patch(path, { ...student })
      .then((result) => {
        console.log(result)
        dispatch({ type: BATCH_UPDATED, payload: result.body })
        dispatch({ type: APP_DONE_LOADING })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_ERROR, payload: error.message })
      })
  }
}
