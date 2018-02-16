import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import CreateBatch from '../components/forms/CreateBatch'
import BatchItem, { batchShape } from '../components/BatchItem'

// material-ui
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar';

import './BatchesContainer.css'

const customContentStyle = {
  width: '400px',
  maxWidth: '400px',
  textAlign: 'center',
}

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
    createBatches: PropTypes.func.isRequired,
    fetchBatches: PropTypes.func.isRequired
  }

  state = {
    open: false,
    openSnackbar: false,
    message: "Batch created!"
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  toggleFormState = () => {
    this.setState({open: !this.state.open})
  }

  toggleSnackbarState = () => {
    this.setState({
      openSnackbar: !this.state.openSnackbar,
    })
  }

  render() {
    if (!this.props.currentBatches) return null

    return (
      <Fragment>
        <div className="batches-header">
          <h1 className="header">Current classes: </h1>
          <div className="add-batch">
            <RaisedButton label="Add a new batch" onClick={this.toggleFormState} secondary={true} />

            <Dialog
              title="Create a new batch"
              modal={false}
              contentStyle={customContentStyle}
              open={this.state.open}
              onRequestClose={this.toggleFormState} >

              <CreateBatch
                toggleFormState={this.toggleFormState}
                createBatch={this.props.createBatch}
                toggleSnackbarState={this.toggleSnackbarState}
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
            <h1 className="header">Upcoming classes: </h1>
            <div className="batches-grid">
              {this.props.upcomingBatches.map(batch => <BatchItem key={batch._id} { ...batch } />)}
            </div>
          </div> :
        null }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches.allBatches,
  currentBatches: state.batches.allBatches.filter(batch => {
    const today = new Date()
    const startDate = new Date(batch.startDate)
    const endDate = new Date(batch.endDate)

    if ((today >= startDate) && (today <= endDate )) return batch
  }),

  upcomingBatches: state.batches.allBatches.filter(batch => {
    const today = new Date()
    if ((new Date(batch.startDate) > today)) return batch
  })
})

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
