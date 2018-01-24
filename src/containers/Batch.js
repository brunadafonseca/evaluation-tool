// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
//
// class Batch extends PureComponent {
//   render() {
//     const { number, startDate, endDate, batchId } = this.props
//     return (
//         <div className="batch">
//           <p>Batch #{ number }</p>
//           <p>Start date: { startDate.slice(0, 10) }</p>
//           <p>End date: { endDate.slice(0, 10) }</p>
//
//         <Link to={ `/batches/${batchId}` }>
//           <button>View this batch</button>
//         </Link>
//       </div>
//     )
//   }
// }
//
// const mapStateToProps = ({ batches }) => ({ batches })
//
// export default connect(mapStateToProps)(Batch)
