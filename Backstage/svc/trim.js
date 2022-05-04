const trimUserInfo = ({ _id, userName, nickName, email }) => ({
  userId: _id.toString(),
  userName,
  nickName,
  email
})

const trimCommentInfo = ({ _id, author, content, replyTo, createdAt }) => ({
  commentId: _id.toString(),
  author: trimUserInfo(author),
  content,
  replyTo: replyTo ? replyTo.toString() : null,
  createdAt
})

const trimBlogInfo = ({
  _id, title, brief, content, createdAt, lastUpdate, author, comments, commentCount
}) => ({
  blogId: _id.toString(),
  author: trimUserInfo(author),
  title,
  brief,
  content,
  createdAt,
  lastUpdate,
  comments: comments ? comments.map(trimCommentInfo) : null,
  // eslint-disable-next-line no-nested-ternary
  commentCount: commentCount ? commentCount.count : (comments ? comments.length : 0)
})

module.exports = {
  trimUserInfo,
  trimCommentInfo,
  trimBlogInfo
}
