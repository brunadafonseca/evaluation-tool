import { FETCHED_BATCHES, FETCHED_ONE_BATCH, FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'
import { STUDENT_CREATED } from '../actions/students/create'
import { BATCH_UPDATED, STUDENTS_UPDATED, UPDATED_BATCH_PERFORMANCE, BATCH_REMOVED, STUDENT_UPDATED } from '../actions/batches/update'


export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case BATCH_CREATED :
      const newBatch = { ...payload }
      return [newBatch].concat(state)

    case FETCHED_BATCHES:
      return [ ...payload ]

    case FETCHED_ONE_BATCH:
      const batchIds = state.map(b => b._id)
      if (batchIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

    case FETCHED_ONE_STUDENT:
      return payload

    case STUDENT_CREATED:
    case BATCH_UPDATED:
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return { ...payload }
        }
        return batch
      })

    case STUDENTS_UPDATED:
      return [{ ...state }].concat(payload)

    case STUDENT_UPDATED:
      return state.map((batch) => {
        if (batch._id === payload.batchId) {
          return { ...payload }
        }
        return batch
      })

    case BATCH_REMOVED:
        return state.filter((batch) => (batch._id !== payload._id))

    case UPDATED_BATCH_PERFORMANCE:
      return { ...state, payload }

    default :
      return state
  }
}
