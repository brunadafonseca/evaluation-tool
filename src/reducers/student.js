import { FETCHED_ONE_STUDENT } from '../actions/batches/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ONE_STUDENT:
    console.log(payload[0])
      return payload[0]

    default :
      return state
  }
}
