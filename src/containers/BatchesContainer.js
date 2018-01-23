import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './BatchesContainer.css'
import { CreateBatch } from './CreateBatch'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import Batch from './Batch'

class BatchesContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderBatch = (batch) => {
    return (
      <Batch
        number={batch.number}
        startDate={batch.startDate}
        endDate={batch.endDate}
        batchId={batch._id}
      />
    )
  }

  render() {
    return (
      <div className="BatchesContainer">
        <h1>List of batches</h1>
        <CreateBatch createBatch={this.props.createBatch}/>
        <Paper className="paper">
          <Menu>
            {this.props.batches.map(this.renderBatch)}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
