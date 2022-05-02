import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useTranslation } from 'react-i18next'

import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

const Language = () => {
  const { t, i18n } = useTranslation()

  const language = getLocalStorage('UI.Language') || 'zh_CN'

  const changeLanguage = e => {
    const lang = e.target.value
    i18n.changeLanguage(lang).then(() => {})
    setLocalStorage('UI.Language', lang)
  }

  return (
    <div style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
      <FormControl>
        <FormLabel>{ t('UI.MainMenu.SetLanguage') }</FormLabel>
        <RadioGroup defaultValue={language} onChange={changeLanguage}>
          <FormControlLabel control={<Radio />} label="简体中文" value="zh_CN" />
          <FormControlLabel control={<Radio />} label="English" value="en" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Language
