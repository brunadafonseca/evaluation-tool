import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchBatchById } from '../actions/batches/fetch'
import { AddStudentForm } from './AddStudentForm'
import addStudent from '../actions/batches/add-student'

export class BatchPage extends PureComponent {
  static propTypes = {
    addStudent: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatchById(this.props.match.params.batchId)
  }

  render() {
    console.log(this.props)
    const { _id, number, startDate, endDate, students } = this.props.batches

    return (
      <div className="batch">
        <p>Batch #{ number }</p>
        <p>Start date: { startDate }</p>
        <p>End date: { endDate }</p>
        <ul>List of students
          <li>{students}</li>
        </ul>
        <AddStudentForm batchId={_id} addStudent={this.props.addStudent} />
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchBatchById, addStudent })(BatchPage)
