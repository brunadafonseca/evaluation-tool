import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

export const batchShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array.isRequired
})

const style = {
  margin: 12,
}

class BatchItem extends PureComponent {
  static propTypes = {
    ...batchShape
  }

  render() {
    const { _id, number, startDate, endDate } = this.props
    
    return (
        <div className="batch">
          <p>Batch #{ number }</p>
          <p>Start date: { startDate && startDate.slice(0, 10) }</p>
          <p>End date: { endDate && endDate.slice(0, 10) }</p>

        <Link to={ `/batches/${_id}` }>
          <RaisedButton label="View Batch" secondary={true} style={style} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps)(BatchItem)
