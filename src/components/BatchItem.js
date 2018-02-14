import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import './BatchItem.css'

export const batchShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired,
})

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired
  }

  render() {
    const { _id, number, startDate, endDate, students } = this.props

    return (
      <Paper className="card">
        <div className="batch">
          <h3>Batch #{ number }</h3>

          <p className="batches-dates">Start date: { new Date(startDate).toDateString() }</p>
          <p className="batches-dates">End date: { new Date(endDate).toDateString() }</p>

          <p className="students-count">{(students.length === 1) ?
              `${students.length} Student` :
              `${students.length} Students` }
          </p>
      </div>
        <Link to={ `/batches/${_id}` }>
          <div className="card-footer">
            <p>View Batch</p>
          </div>
        </Link>
    </Paper>
    )
  }
}


export default BatchItem
