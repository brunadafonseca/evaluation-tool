import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { push } from 'react-router-redux'

export const BATCH_DELETED = 'BATCH_DELETED'

const api = new API()

export const deleteBatch = (batchId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.delete(`/batches/${batchId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch(push('/'))
        
        dispatch({ type: BATCH_DELETED, payload: result.body })
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
