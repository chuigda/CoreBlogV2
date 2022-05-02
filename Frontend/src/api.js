import { mobius } from './utils/mobius'

export const listBlog = (page, pageSize, sortByLastUpdate) => {
  return mobius.get('/api/blog/list').params({ page, pageSize, sortByLastUpdate }).do()
}
