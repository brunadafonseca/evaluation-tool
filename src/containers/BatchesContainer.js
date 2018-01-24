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
        <CreateBatchForm createBatch={this.props.createBatch}/>
        <div className="batches">
          <h1>List of batches</h1>
          <div className="batches-grid">
            {this.props.batches.map(batch => <Paper className="paper"><BatchItem { ...batch } /></Paper>)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
