import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class BatchItem extends PureComponent {
  render() {
    const { number, startDate, endDate, batchId } = this.props
    return (
        <div className="batch">
          <p>Batch #{ number }</p>
          <p>Start date: { startDate }</p>
          <p>End date: { endDate }</p>

        <Link to={ `/batches/${batchId}` }>
          <button>View this batch</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(BatchItem)
