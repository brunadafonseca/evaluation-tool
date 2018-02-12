import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateEvaluation } from '../actions/batches/update'
import { Link } from 'react-router-dom'
import './StudentItem.css'
import fetchStudents, { fetchBatchById } from '../actions/batches/fetch'

import './Student.css'

class StudentItem extends PureComponent {

  render() {
    if (!this.props.evaluations) return null
    const { name, photo, studentId, evaluations, batchId } = this.props
    const lastEvaluation = evaluations[0]

    return (
      <Link to={ `/batches/${batchId}/students/${studentId}` }>
        <div className="students-card">
          <div className="profile-picture">
            <img src={photo} alt='' />
          </div>
          <div className="info">
            <p>{name}</p>
            {lastEvaluation && <div className={`last-evaluation ${lastEvaluation.color}`}></div>}
          </div>
        </div>
      </Link>
    )
  }
}

export default connect(null, { updateEvaluation, fetchBatchById })(StudentItem)
