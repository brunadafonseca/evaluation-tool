import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const darkBlue     = '#01062A'
export const beige        = '#D9E5CA'
export const orange       = '#E4A33F'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#DEDEDE'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: orange,
  primary2Color: orange,
  primary3Color: beige,
  accent1Color: orange,
  textColor: black,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey,
  disabledColor: grey30
}

export default getMuiTheme({ palette })
