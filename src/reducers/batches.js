import { FETCHED_BATCHES, FETCHED_ONE_BATCH } from '../actions/batches/fetch'
import { BATCH_CREATED } from '../actions/batches/create'
import { BATCH_UPDATED } from '../actions/batches/update'
import { BATCH_DELETED } from '../actions/batches/delete'

import { STUDENT_CREATED } from '../actions/students/create'
import { STUDENT_UPDATED } from '../actions/students/update'
import { STUDENT_DELETED } from '../actions/students/delete'
import { FETCHED_ONE_STUDENT } from '../actions/students/fetch'

const INITIAL_STATE = {
  allBatches: [],
  selectedBatch: {
    number: 'Oops, I think we missed it.',
    students: [],
    startDate: new Date(),
    endDate: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  }
}

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case FETCHED_BATCHES:
      return Object.assign({}, state, { allBatches: payload})

    case FETCHED_ONE_BATCH:
      return { ...state, selectedBatch: payload }

    case BATCH_CREATED:
      return Object.assign({}, state, { allBatches: [payload].concat(state.allBatches) })

    case FETCHED_ONE_STUDENT:
      return Object.assign({}, state, { selectedStudent: payload })

    case STUDENT_CREATED:
    case STUDENT_UPDATED:
    case STUDENT_DELETED:
    case BATCH_UPDATED:
      return Object.assign({}, state, { selectedBatch: payload })

    case BATCH_DELETED:
        const updatedBatches = state.allBatches.filter((batch) => (batch._id !== payload._id))
        return Object.assign({}, state, { allBatches: updatedBatches })

    default :
      return state
  }
}
