import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import './BatchItem.css'

export const batchShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array.isRequired,
    batchPerformance: PropTypes.array
})

const style = {
  margin: 12,
}

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape
  }

  render() {
    console.log(this.props);
    const { _id, number, startDate, endDate, students } = this.props

    return (
      <div className="batch">
        <p>Batch #{ number }</p>
          {!!(students.length > 0) &&
            <p className="students-count">{(students.length > 1) ?
                `${students.length} Students` :
                `${students.length} Student` }
            </p>
          }

        <p className="batches-dates">Start date: { startDate && startDate.slice(0, 10) }</p>
        <p className="batches-dates">End date: { endDate && endDate.slice(0, 10) }</p>

      <Link to={ `/batches/${_id}` }>
        <RaisedButton label="View Batch" secondary={true} style={style} />
      </Link>

    </div>
    )
  }
}

// const mapStateToProps = ({ batches }) => ({ batches })

export default BatchItem
