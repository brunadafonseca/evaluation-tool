import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR
} from '../loading'

export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'

const api = new API()

export const fetchStudentById = (batchId, studentId) => {
  return dispatch => {
    const path = `/batches/${batchId}/students/${studentId}`
    dispatch({ type: APP_LOADING })

    api.get(path)
      .then((result) => {
        dispatch({ type: FETCHED_ONE_STUDENT, payload: result.body })
        dispatch({ type: APP_DONE_LOADING })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_ERROR, payload: error.message })
      })
  }
}
