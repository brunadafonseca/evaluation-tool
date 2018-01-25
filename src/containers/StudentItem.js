import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import { updateEvaluation } from '../actions/batches/update'
import { Link } from 'react-router-dom'
import './StudentItem.css'

import './Student.css'

class StudentItem extends PureComponent {
  render() {
    const { name, photo, _id, batches, evaluations } = this.props
    const batchId = batches[0]._id

    return (
      <Link to={ `/batches/${batchId}/students/${_id}` }>
        <div className="students-card">
          <div className="profile-picture">
            <img src={photo} />
          </div>
          <div className="info">
            <p>{name}</p>
            <div className={ evaluations[evaluations.length-1] && evaluations[evaluations.length-1].color}></div>
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { updateEvaluation })(StudentItem)
