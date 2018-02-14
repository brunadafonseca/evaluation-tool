import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './BatchesContainer.css'
import { CreateBatch } from '../components/forms/CreateBatch'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import BatchItem, { batchShape } from '../components/BatchItem'
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
    openSnackbar: false,
    message: "Batch created!"
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
        <div className="header">
          <h1 className="batches-header">Current classes: </h1>
          <div className="add-batch">
            <RaisedButton label="Add a new batch" onClick={this.handleOpen} secondary={true} />

            <Dialog
              title="Create a new batch"
              modal={false}
              contentStyle={customContentStyle}
              open={this.state.open}
              onRequestClose={this.handleClose} >

              <CreateBatch
                handleClose={this.handleClose}
                createBatch={this.props.createBatch}
                switchSnackbarState={this.switchSnackbarState}
              />
            </Dialog>

            <Snackbar
              open={this.state.openSnackbar}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </div>

        <div className="batches-grid">
          {this.props.currentBatches.map(batch => <BatchItem key={batch._id} { ...batch } />)}
        </div>

        { (this.props.upcomingBatches.length > 0 ) ?
          <div>
            <h1 className="batches-header">Upcoming classes: </h1>
            <div className="batches-grid">
              {this.props.upcomingBatches.map(batch => <BatchItem key={batch._id} { ...batch } />)}
            </div>
          </div> :
        null }

        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.message}
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
  }),

  upcomingBatches: state.batches.allBatches.filter(batch => {
    const today = new Date()
    if ((new Date(batch.startDate) > today)) return batch
  })
})

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
