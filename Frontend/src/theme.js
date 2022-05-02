import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: [
      '\'Noto Serif\'',
      '\'Liberation Serif\'',
      'SimSun',
      'serif'
    ].join(',')
  }
})

export default theme
