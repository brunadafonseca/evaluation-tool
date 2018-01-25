import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ActionThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import { updateEvaluation } from '../actions/batches/update'
import { fetchStudentById } from '../actions/batches/fetch'

export class StudentPage extends PureComponent {

  componentWillMount() {
    console.log(this.props)
    const batchId = (this.props.match.params.batchId)
    const studentId = (this.props.match.params.studentId)

    this.props.fetchStudentById(batchId, studentId)
  }

  render() {
    const student = this.props.student[0]

    return (
      <div>
        <div className="student">
          <h1>{ student && student.name }</h1>
          <img src={ student && student.photo } />
        </div>
        <div className="evaluation-btns">
          <FloatingActionButton
            data-id="green"
            className="green"
            backgroundColor="#00B749">
            <ActionThumbUp />
          </FloatingActionButton>
          <FloatingActionButton
            data-id="orange"
            className="orange"
            backgroundColor="#FFBA08">
            <ActionThumbsUpDown />
          </FloatingActionButton>
          <FloatingActionButton
            data-id="red"
            className="red"
            backgroundColor="#D00000">
            <ActionThumbDown />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ student }) => ({ student })

export default connect(mapStateToProps, { fetchStudentById, updateEvaluation })(StudentPage)
