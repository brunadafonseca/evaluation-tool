import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const STUDENT_CREATED = 'STUDENT_CREATED'

const api = new API()

export const createStudent = (batchId, newStudent = {}) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.post(`/batches/${batchId}/students`, newStudent)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: STUDENT_CREATED, payload: result.body })
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
