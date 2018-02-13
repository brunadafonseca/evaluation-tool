import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const STUDENT_UPDATED = 'STUDENT_UPDATED'
export const BATCH_UPDATED = 'BATCH_UPDATED'

const api = new API()

export const updateStudent = (batchId, updatedStudent = {}) => {
  const studentId = updatedStudent._id

  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/batches/${batchId}/students/${studentId}`, updatedStudent)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({ type: STUDENT_UPDATED, payload: result.body.updatedStudent })
        dispatch({ type: BATCH_UPDATED, payload: result.body.updatedBatch })
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
