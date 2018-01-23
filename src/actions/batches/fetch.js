import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const FETCHED_BATCHES = 'FETCHED_BATCHES'
export const FETCHED_ONE_BATCH = 'FETCHED_ONE_BATCH'
export const BATCH_STUDENTS_UPDATED = 'BATCH_STUDENTS_UPDATED'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.get('/batches')
      .then((result) => {
        dispatch({
          type: FETCHED_BATCHES,
          payload: result.body
        })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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

export const fetchStudents = (batch) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batch._id}/students`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: BATCH_STUDENTS_UPDATED,
          payload: {
            batch,
            students: result.body
          }
        })
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

export const fetchOneBatch = (batchId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.get(`/batches/${batchId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_BATCH,
          payload: result.body
        })
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

export const fetchBatchById = (batchId) => {
  return dispatch => {
    const path = `/batches/${batchId}`
    dispatch({ type: APP_LOADING })

    api.get(path)
      .then((result) => {
        dispatch({ type: FETCHED_ONE_BATCH, payload: result.body })
        dispatch({ type: APP_DONE_LOADING })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_ERROR, payload: error.message })
      })
  }
}
