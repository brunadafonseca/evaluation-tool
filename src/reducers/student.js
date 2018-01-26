// import { FETCHED_ONE_STUDENT } from '../actions/batches/fetch'
// import { STUDENT_UPDATED } from '../actions/batches/update'
//
// export default (state = [], { type, payload } = {}) => {
//   switch (type) {
//     case FETCHED_ONE_STUDENT:
//       return { ...state, ...payload }
//
//     case STUDENT_UPDATED:
//       return state.map((batch) => {
//         if (batch._id === payload.batch._id) {
//           return batch.map((student) => {
//             if (student._id === payload.student._id) {
//               return { ...payload.student, evaluations: payload.evaluations }
//             }
//             return student
//           })
//         }
//         return batch
//       })
//
//     default :
//       return state
//   }
// }
//
// // case STUDENTS_UPDATED :
// //   return state.map((batch) => {
// //     if (batch._id === payload.batch._id) {
// //       return { ...payload.batch, students: payload.students }
// //     }
// //     return batch
// //   })
