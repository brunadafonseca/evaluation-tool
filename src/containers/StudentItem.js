import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateEvaluation } from '../actions/batches/update'
import { Link } from 'react-router-dom'
import './StudentItem.css'

import './Student.css'

class StudentItem extends PureComponent {
  render() {
    const { name, photo, _id, evaluations, batches } = this.props
    const batchId = batches[0]._id

    return (
      <Link to={ `/batches/${batchId}/students/${_id}` }>
        <div className="students-card">
          <div className="profile-picture">
            <img src={photo} alt='' />
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
