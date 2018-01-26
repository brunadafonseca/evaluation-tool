import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import './BatchesContainer.css'
import { CreateBatchForm } from './CreateBatchForm'
import createBatch from '../actions/batches/create'
import fetchBatches from '../actions/batches/fetch'
import BatchItem, { batchShape } from './BatchItem'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.arrayOf(batchShape).isRequired,
  }

  state = {
      open: false,
    };

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

  componentWillMount() {
    this.props.fetchBatches()
  }

  render() {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div className="BatchesContainer">
        <div>
          <div class="add-batch">
            <RaisedButton label="Add a new batch" onClick={this.handleOpen} primary={true} />
          </div>
          <Dialog
            title="Create a new batch"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose} >
              <CreateBatchForm
                handleClose={this.handleClose}
                createBatch={this.props.createBatch} />
          </Dialog>
        </div>
        <div className="batches">
          <h1>List of batches</h1>
          <div className="batches-grid">
            {this.props.batches && this.props.batches.map(batch => <Paper className="paper"><BatchItem { ...batch } /></Paper>)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { createBatch, fetchBatches })(BatchesContainer)
