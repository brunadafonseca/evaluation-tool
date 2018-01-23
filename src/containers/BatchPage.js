import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'

export class BatchPage extends PureComponent {
  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  render() {
    const { _id, number, startDate, endDate, students } = this.props.batches
    console.log(startDate)
    return (
      <div className="batch">
        <p>Batch #{ number }</p>
        <p>Start date: { startDate }</p>
        <p>End date: { endDate }</p>
        <ul>List of students
          <li>{students}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchBatchById })(BatchPage)
