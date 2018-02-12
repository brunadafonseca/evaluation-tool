import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateEvaluation } from '../actions/batches/update'
import { Link } from 'react-router-dom'
import './StudentItem.css'
import fetchStudents, { fetchBatchById } from '../actions/batches/fetch'

import './Student.css'

class StudentItem extends PureComponent {

  render() {
    const { name, photo, studentId, evaluations, batchId } = this.props
    console.log(evaluations);
    return (
      <Link to={ `/batches/${batchId}/students/${studentId}` }>
        <div className="students-card">
          <div className="profile-picture">
            <img src={photo} alt='' />
          </div>
          <div className="info">
            <p>{name}</p>
            <div className='whatever'></div> 
          </div>
        </div>
      </Link>
    )
  }
}

export default connect(null, { updateEvaluation, fetchBatchById })(StudentItem)
