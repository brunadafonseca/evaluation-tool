import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import './BatchItem.css'

export const batchShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    students: PropTypes.array.isRequired,
})

const style = {
  margin: 12,
}

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape.isRequired
  }

  render() {
    const { _id, number, startDate, endDate, students } = this.props

    return (
      <Paper className="paper">
      <div className="batch">
        <p>Batch #{ number }</p>
          {!!(students.length > 0) &&
            <p className="students-count">{(students.length > 1) ?
                `${students.length} Students` :
                `${students.length} Student` }
            </p>
          }

        <p className="batches-dates">Start date: { new Date(startDate).toDateString() }</p>
        <p className="batches-dates">End date: { new Date(endDate).toDateString() }</p>

      <Link to={ `/batches/${_id}` }>
        <RaisedButton label="View Batch" secondary={true} style={style} />
      </Link>

    </div>
  </Paper>
    )
  }
}

// const mapStateToProps = ({ batches }) => ({ batches })

export default BatchItem
