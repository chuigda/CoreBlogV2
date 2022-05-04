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
