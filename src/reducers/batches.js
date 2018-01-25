import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'
import { BATCH_UPDATED } from '../actions/batches/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_CREATED:
      const newBatch = { ...payload }
      return [ newBatch ].concat(state)

    case FETCHED_BATCHES:
      return payload

    case FETCHED_ONE_BATCH:
      return [payload].concat(state)

    case BATCH_UPDATED:
      return [{ ...state }].concat(payload)

    default :
      return state
  }
}
