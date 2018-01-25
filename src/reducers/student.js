import { FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
import { STUDENT_UPDATED } from '../actions/batches/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ONE_STUDENT:
      return { ...state, ...payload }

    case STUDENT_UPDATED:
      return { ...state, ...payload }

    default :
      return state
  }
}
