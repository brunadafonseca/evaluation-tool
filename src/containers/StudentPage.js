import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStudentById } from '../actions/batches/fetch'

export class StudentPage extends PureComponent {

  componentWillMount() {
    console.log(this.props)
    const batchId = (this.props.match.params.batchId)
    const studentId = (this.props.match.params.studentId)

    this.props.fetchStudentById(batchId, studentId)
    console.log(this.props)
  }

  render() {
    console.log(this.props)

    const { name, photo } = this.props.student
    return (
        <div className="student">
          <h1>Hello world</h1>
          <p>{name}</p>
          <img src={photo} />
      </div>
    )
  }
}

const mapStateToProps = ({ student }) => ({ student })

export default connect(mapStateToProps, { fetchStudentById })(StudentPage)
