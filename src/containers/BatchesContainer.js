import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import './BatchesContainer.css'
import { CreateBatch } from './CreateBatch'
import createBatch from '../actions/batches/create'

class BatchesContainer extends PureComponent {
  renderBatch = (batch) => {
    return (
      <div>
        <p>Batch #{batch.number}</p>
        <p>{ batch.startDate }</p>
        <p>{ batch.endDate }</p>
      </div>
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

export default connect(mapStateToProps, { createBatch })(BatchesContainer)
