import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'
import { BATCH_UPDATED } from '../actions/batches/add-student'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_CREATED:
      const newBatch = { ...payload }
      console.log(newBatch)
      return [ newBatch ].concat(state)

    case FETCHED_BATCHES:
      console.log(payload)
      return payload

    case FETCHED_ONE_BATCH :
      console.log([payload].concat(state))
      return [payload].concat(state)

    case BATCH_UPDATED:
      return [{ ...state }].concat(payload)

    case FETCHED_ONE_STUDENT :
      console.log([payload].concat(state))
      return [payload].concat(state)

    default :
      return state
  }
}
