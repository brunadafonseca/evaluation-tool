import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import './BatchesContainer.css'
import { CreateBatchForm } from './CreateBatchForm'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import BatchItem, { batchShape } from './BatchItem'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';

const customContentStyle = {
  width: '400px',
  maxWidth: '400px',
}

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }

  state = {
    open: false,
    openSnackbar: false
  }

  switchSnackbarState = () => {
    this.setState({
      openSnackbar: !this.state.openSnackbar,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  render() {
    if (!this.props.currentBatches) return null

    return (
      <div className="batches-container">
        <div>
          <div class="add-batch">
            <RaisedButton label="Add a new batch" onClick={this.handleOpen} primary={true} />
            <Snackbar
              open={this.state.openSnackbar}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </div>

          <Dialog
            title="Create a new batch"
            modal={false}
            contentStyle={customContentStyle}
            open={this.state.open}
            onRequestClose={this.handleClose}>

            <CreateBatchForm
              handleClose={this.handleClose}
              createBatch={this.props.createBatch}
              switchSnackbarState={this.switchSnackbarState}
            />
          </Dialog>
        </div>

        <div className="batches">
          <h1>Current batches: </h1>

          <div className="batches-grid">
            {this.props.currentBatches.map(batch => <Paper className="paper"><BatchItem { ...batch } /></Paper>)}
          </div>
        </div>
        <Snackbar
          open={this.state.openSnackbar}
          message="Batch created!"
          autoHideDuration={4000}
          onRequestClose={this.setSnackbarState}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches.allBatches,
  currentBatches: state.batches.allBatches.filter(batch => {
    const today = new Date()
    if ((new Date(batch.startDate) <= today) && new Date(batch.endDate) >= today) return batch
  })
})

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
