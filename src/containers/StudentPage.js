import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStudentById } from '../actions/batches/fetch'

export class StudentPage extends PureComponent {

  render() {
    const { name, photo } = this.props
    return (
        <div className="student">
          <p>{name}</p>
          <img src={photo} />
      </div>
    )
  }
}

const mapStateToProps = ({ batches }) => ({ batches })

export default connect(mapStateToProps, { fetchStudentById })(StudentPage)
