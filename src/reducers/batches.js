import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'
import { BATCH_UPDATED } from '../actions/batches/add-student'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_CREATED:
      const newBatch = { ...payload }
      console.log(newBatch)
      return [ newBatch ].concat(state)

    case FETCHED_BATCHES:
      return [ ...payload ]

    case FETCHED_ONE_BATCH:
      return { ...payload }

    case BATCH_UPDATED:
      return [{ ...state }].concat(payload)

    default :
      return state
  }
}
