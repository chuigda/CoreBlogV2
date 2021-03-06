import React from 'react'
import Card from '@mui/material/Card'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { CardContent, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import XDivider from '../components/divider.jsx'
import { setLocalStorage } from '../utils/localStorage'

const Language = () => {
  const { t, i18n } = useTranslation()
  const { language } = i18n

  const changeLanguage = e => {
    const lang = e.target.value
    i18n.changeLanguage(lang).then(() => {})
    setLocalStorage('UI.Language', lang)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ flex: '0 1 400px' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6">
            { t('UI.MainMenu.SetLanguage') }
          </Typography>
          <XDivider />
          <FormControl>
            <RadioGroup defaultValue={language} onChange={changeLanguage}>
              <FormControlLabel control={<Radio />} label="简体中文" value="zh_CN" />
              <FormControlLabel control={<Radio />} label="English" value="en" />
            </RadioGroup>
          </FormControl>
          <XDivider />
          <Typography variant="body1">
            { t('UI.SetLanguage.Sample') }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default Language
