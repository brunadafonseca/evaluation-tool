import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_CREATED :
      const newBatch = { ...payload }
      console.log(newBatch)
      return [newBatch].concat(state)

    default :
      return state
  }
}
