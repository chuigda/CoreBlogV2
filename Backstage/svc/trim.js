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
  _id, title, content, createdAt, lastUpdate, author, comments, commentCount
}) => ({
  blogId: _id.toString(),
  author: trimUserInfo(author),
  title,
  content,
  createdAt,
  lastUpdate,
  comments: comments ? comments.map(trimCommentInfo) : null,
  commentCount: commentCount ? commentCount.count : (comments.length || 0)
})

module.exports = {
  trimUserInfo,
  trimCommentInfo,
  trimBlogInfo
}
