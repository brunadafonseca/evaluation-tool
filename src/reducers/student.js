import { FETCHED_ONE_STUDENT } from '../actions/batches/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ONE_STUDENT:
      return { ...state, ...payload }

    default :
      return state
  }
}
