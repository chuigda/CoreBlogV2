import { mobius } from './utils/mobius'

export const getBlog = blogId => mobius.get('/api/blog/get').params({ blogId }).do()

export const listBlog = (page, pageSize, sortByLastUpdate) => mobius
  .get('/api/blog/list')
  .params({ page, pageSize, sortByLastUpdate })
  .do()

export const addBlog = (title, brief, content) => mobius
  .post('/api/blog/add')
  .data({ title, brief, content })
  .priv(true)
  .do()

export const changeNickName = nickName => mobius.post('/api/user/changeNickName')
  .data({ nickName })
  .priv(true)
  .do()

export const changeEmail = email => mobius.post('/api/user/changeEmail')
  .data({ email })
  .priv(true)
  .do()

export const changePassword = password => mobius.post('/api/user/changePassword')
  .data({ password })
  .priv(true)
  .do()
