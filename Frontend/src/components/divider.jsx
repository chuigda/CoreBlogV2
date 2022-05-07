import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from '@mui/material'

const XDivider = ({ style }) => (
  <Divider style={style} sx={{ marginTop: '4px', marginBottom: '4px' }} />
)

XDivider.propTypes = {
  style: PropTypes.object
}

export default XDivider
