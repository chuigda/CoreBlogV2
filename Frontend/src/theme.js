import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      '\'Noto Serif SC\'',
      '\'Liberation Serif\'',
      'SimSun',
      'serif'
    ].join(',')
  }
})

export default theme
