import React, { useRef } from 'react'
import {
  Button, Card, CardContent, TextField
} from '@mui/material'
import Editor from '@monaco-editor/react'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

import { addBlog } from '../api'

const BlogEdit = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const titleRef = useRef()
  const briefRef = useRef()
  const editorRef = useRef()

  const onClickSaveButton = () => {
    const title = titleRef.current.value
    const brief = briefRef.current.value
    const content = editorRef.current.getValue()

    if (title.length === 0) {
      enqueueSnackbar(t('UI.BlogEdit.NeedTitle'), { variant: 'error' })
      return
    }

    if (brief.length === 0) {
      enqueueSnackbar(t('UI.BlogEdit.NeedBrief'), { variant: 'error' })
      return
    }

    if (content.length === 0) {
      enqueueSnackbar(t('UI.BlogEdit.NeedContent'), { variant: 'error' })
      return
    }

    addBlog(title, brief, content).then(res => {
      if (!res.success) {
        enqueueSnackbar(t(res.messageId), { variant: 'error' })
        return
      }

      enqueueSnackbar(t(res.messageId), { variant: 'success' })
      history.replace(`/blog/${res.data.blogId}`)
    }).catch(() => enqueueSnackbar(t('Server.InternalError'), { variant: 'error' }))
  }

  return (
    <Card>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField size="medium"
                   variant="standard"
                   inputRef={titleRef}
                   required
                   label={t('UI.BlogEdit.TitleInput')}
                   sx={{
                     width: '50%',
                     mobile: {
                       width: '100%'
                     }
                   }}
        />
        <TextField size="medium"
                   variant="outlined"
                   multiline
                   inputRef={briefRef}
                   required
                   label={t('UI.BlogEdit.BriefInput')}
                   sx={{
                     marginTop: '12px',
                     width: '100%',
                     '& .MuiInputBase-root': {
                       borderRadius: 0
                     }
                   }}
                   rows={6}
                   maxRows={6}
        />
        <div style={{
          marginTop: 12,
          marginBottom: 12,
          border: '1px solid #1976d2',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Editor height="50vh"
                  defaultLanguage="markdown"
                  onMount={(editor => { editorRef.current = editor })}
                  options={{
                    minimap: {
                      enabled: false
                    },
                    wordWrap: true
                  }}
          />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={onClickSaveButton}>
            {t('UI.BlogEdit.SaveButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogEdit
