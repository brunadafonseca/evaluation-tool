import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './BatchesContainer.css'
import { CreateBatchForm } from './CreateBatchForm'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import BatchItem, { batchShape } from './BatchItem'

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  render() {
    return (
      <div className="BatchesContainer">
        <h1>List of batches</h1>
        <CreateBatchForm createBatch={this.props.createBatch}/>
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(batch => <BatchItem { ...batch } />)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
