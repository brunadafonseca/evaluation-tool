import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { push } from 'react-router-redux'

export const STUDENT_DELETED = 'STUDENT_DELETED'

const api = new API()

export const deleteStudent = (batchId, studentId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/batches/${batchId}/students/${studentId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({ type: STUDENT_DELETED, payload: result.body })
        
        dispatch(push(`/batches/${batchId}`))
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
