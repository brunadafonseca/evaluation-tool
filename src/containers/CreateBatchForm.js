import React from 'react'
import DatePicker from 'material-ui/DatePicker'

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
}

export default class CreateBatchForm extends React.Component {
  constructor(props) {
    super(props)

    const minDate = new Date()
    const maxDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 1)
    minDate.setHours(0, 0, 0, 0)
    maxDate.setFullYear(maxDate.getFullYear() + 1)
    maxDate.setHours(0, 0, 0, 0)

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true,
      disableYearSelection: false,
    }
  }



  render() {
    return (
      <div style={optionsStyle}>
        <DatePicker
          onChange={this.handleChangeMinDate}
          autoOk={true}
          floatingLabelText="Start Date"
          defaultDate={this.state.minDate}
          disableYearSelection={false}
        />
        <DatePicker
          onChange={this.handleChangeMaxDate}
          autoOk={true}
          floatingLabelText="End Date"
          defaultDate={this.state.maxDate}
          disableYearSelection={false}
        />
      </div>
    )
  }
}
