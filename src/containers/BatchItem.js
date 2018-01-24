import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export const batchShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array.isRequired
})

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape
  }

  render() {
    console.log(this.props)

    const { _id, number, startDate, endDate } = this.props
    return (
        <div className="batch">
          <p>Batch #{ number }</p>
          <p>Start date: { startDate }</p>
          <p>End date: { endDate }</p>

        <Link to={ `/batches/${_id}` }>
          <button>View this batch</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(BatchItem)
