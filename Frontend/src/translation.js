import { getLocalStorage } from './utils/localStorage'

const translation = {
  resources: {
    en: {
      translation: {
        'User.CreateByAdmin.BadToken': 'Bad administrator token',
        'User.CreateByAdmin.Success': 'Successfully created user',
        'User.Info.NotFound': 'User information not found',
        'User.Info.Success': 'Successfully retrieved user information',
        'User.Login.Success': 'Successfully logged in',
        'User.Login.NotFound': 'Incorrect username or password',
        'User.Edit.Success': 'Successfully updated user information',
        'User.Edit.Fail': 'Failed to update user information',
        'Blog.Add.Success': 'Successfully created blog',
        'Blog.Get.NotFound': 'Blog not found or deleted',
        'Blog.Get.Success': 'Successfully retrieved blog information',
        'Blog.List.Success': 'Successfully retrieved blogs information',
        'Blog.Update.NotFound': 'Blog not found or deleted',
        'Blog.Update.Unauthorized': 'You\'re not the author of this blog',
        'Blog.Update.Success': 'Successfully updated blog',
        'Blog.Delete.NotFound': 'Blog not found or deleted',
        'Blog.Delete.Unauthorized': 'You\'re not the author of this blog',
        'Blog.Delete.Success': 'Successfully deleted blog',
        'Comment.Add.NotFound': 'Blog not found or deleted',
        'Comment.Add.Success': 'Successfully commented',
        'Comment.Delete.NotFound': 'Comment not found or deleted',
        'Comment.Delete.Unauthorized': 'You\'re not the author of this comment',
        'Comment.Delete.Success': 'Successfully deleted comment',
        'Server.InternalError': 'Server error, please try again later',

        'UI.Format.Time': 'HH:mm',
        'UI.Format.DateTime': 'D/M HH:mm',
        'UI.Format.YearDateTime': 'M/D/YYYY',

        'UI.AppBar.Search': 'Search...',
        'UI.MainMenu.SetLanguage': 'Choose language',
        'UI.MainMenu.Login': 'Login',
        'UI.MainMenu.CurrentUser': 'Current user',
        'UI.MainMenu.About': 'About CoreBlog',
        'UI.SetLanguage.Sample': 'The quick brown fox jumps over the lazy dog',
        'UI.Index.LoadMore': 'Click to Load more',
        'UI.Index.NoMoreContent': 'No more blogs',
        'UI.Blog.Author': 'Author',
        'UI.Blog.CreateTime': 'Created at',
        'UI.Blog.UpdateTime': 'Updated at',
        'UI.Blog.CommentCount': 'Comments',
        'UI.BlogEdit.TitleInput': 'Title',
        'UI.BlogEdit.BriefInput': 'Briefing',
        'UI.BlogEdit.SaveButton': 'Save',
        'UI.BlogEdit.NeedTitle': 'Title is required',
        'UI.BlogEdit.NeedBrief': 'Briefing is required',
        'UI.BlogEdit.NeedContent': 'Content is required',
        'UI.Login.Title': 'Login',
        'UI.Login.Username': 'Username',
        'UI.Login.Password': 'Password',
        'UI.Login.Submit': 'Login',
        'UI.Login.Unfilled': 'Please fill in all fields',
        'UI.About.Title': 'About',
        'UI.About.Content': 'This is the second edition of CoreBlog, rewritten with Express.js and React.'
          + ' This new version comes with great UI updates and enhanced many features.',
        'UI.About.Skills': 'Skills used',
        'UI.About.Version.Frontend': 'Frontend version',
        'UI.About.Version.Backend': 'Backend version',
        'UI.About.Bothering': '"O, we all have different fortune which are full of frustrations. '
          + 'Feng Tang aged before his talents recognized, victorious Li Guang was never conferred marquis. '
          + 'It\'s not the lack of wise emperors that leads to Jia Yi\'s being exiled. '
          + 'Isn\'t it in an era of wise politics that Liang Hong hid in the shore of Qilu? '
          + 'All of these are just caused by that wise people feel poverty at ease and brilliant people conform to their fate."',
        'UI.About.EasterEggClick0': 'Click',
        'UI.About.EasterEggClick1': 'more times to enter developer mode',
        'UI.About.EasterEggClick2': 'You\'re now in developer mode',
        'UI.User.DidYouLogin.Title': 'Something seems to be wrong',
        'UI.User.DidYouLogin.Content': 'It seems that you haven\'t logged in yet.',
        'UI.User.DidYouLogin.LoginButton': 'Login',
        'UI.User.DidYouLogin.BackButton': 'Back',
        'UI.User.UserInfo': 'User information',
        'UI.User.UserName': 'User name',
        'UI.User.NickName': 'Nick name',
        'UI.User.Email': 'Email',
        'UI.User.Password': 'Password',
        'UI.User.ConfirmPassword': 'Confirm password',
        'UI.User.ChangePassword': 'Change password',
        'UI.User.Logout': 'logout',
        'UI.User.BadNickName': 'Nick name is required',
        'UI.User.BadEmail': 'Please enter a valid email address',
        'UI.User.UnequalPassword': 'Passwords don\'t match',
        'UI.User.BadPassword': 'Please enter a password complex enough',
        'UI.User.PasswordRequirement': 'A valid password contains at least 8 characters, and should contain all of the following: digits, lowercase letters and uppercase letters',
        'UI.User.ConfirmLogout.Title': 'Confirm logout',
        'UI.User.LogoutSuccess': 'Logged out successfully',

        'UI.Dial.WriteBlog': 'Write a blog',
        'UI.Dial.Share': 'Share',
        'UI.Dialog.Share': 'Share',
        'UI.Dialog.CopyLink': 'Copy link',
        'UI.Dialog.Copied': 'Copied!',
        'UI.Dialog.Close': 'Close',
        'UI.Dialog.Ok': 'Ok',
        'UI.Dialog.Cancel': 'Cancel',

        'UI.Search.Title': 'Search in title',
        'UI.Search.FullText': 'Search in full text',
        'UI.Search.User': 'Search an author',
        'UI.Search.Unimplemented': 'Search is not implemented yet'
      }
    },
    zh_CN: {
      translation: {
        'User.CreateByAdmin.BadToken': '管理员密钥错误',
        'User.CreateByAdmin.Success': '成功创建用户',
        'User.Info.NotFound': '用户信息不存在',
        'User.Info.Success': '成功获取用户信息',
        'User.Login.Success': '登录成功',
        'User.Login.NotFound': '用户名或密码错误',
        'User.Edit.Success': '修改成功',
        'User.Edit.Fail': '修改失败',
        'Blog.Add.Success': '创建博客成功',
        'Blog.Get.NotFound': '博客不存在或已被删除',
        'Blog.Get.Success': '获取博客信息成功',
        'Blog.List.Success': '获取博客列表成功',
        'Blog.Update.NotFound': '博客不存在或已被删除',
        'Blog.Update.Unauthorized': '你不是该博客的作者',
        'Blog.Update.Success': '更新博客成功',
        'Blog.Delete.NotFound': '博客不存在或已被删除',
        'Blog.Delete.Unauthorized': '你不是该博客的作者',
        'Blog.Delete.Success': '删除博客成功',
        'Comment.Add.NotFound': '博客不存在或已被删除',
        'Comment.Add.Success': '评论成功',
        'Comment.Delete.NotFound': '评论不存在或已被删除',
        'Comment.Delete.Unauthorized': '你不是该评论的作者',
        'Comment.Delete.Success': '删除评论成功',
        'Server.InternalError': '服务器遇到问题，请稍候再试',

        'UI.Format.Time': 'HH:mm',
        'UI.Format.DateTime': 'M 月 D 日 HH:mm',
        'UI.Format.YearDateTime': 'YYYY 年 M 月 D 日',

        'UI.AppBar.Search': '搜索...',
        'UI.MainMenu.SetLanguage': '选择语言',
        'UI.MainMenu.Login': '登录',
        'UI.MainMenu.CurrentUser': '当前用户',
        'UI.MainMenu.About': '关于 CoreBlog',
        'UI.SetLanguage.Sample': '我能吞下玻璃而不伤身体',
        'UI.Index.LoadMore': '点击加载更多',
        'UI.Index.NoMoreContent': '没有更多内容了',
        'UI.Blog.Author': '作者',
        'UI.Blog.CreateTime': '创建时间',
        'UI.Blog.UpdateTime': '最后更新',
        'UI.Blog.CommentCount': '条评论',
        'UI.BlogEdit.TitleInput': '标题',
        'UI.BlogEdit.BriefInput': '简介',
        'UI.BlogEdit.SaveButton': '保存',
        'UI.BlogEdit.NeedTitle': '标题不能为空',
        'UI.BlogEdit.NeedBrief': '简介不能为空',
        'UI.BlogEdit.NeedContent': '内容不能为空',
        'UI.Login.Title': '登录',
        'UI.Login.Username': '用户名',
        'UI.Login.Password': '密码',
        'UI.Login.Submit': '登录',
        'UI.Login.Unfilled': '请填写所有字段',
        'UI.About.Title': '关于',
        'UI.About.Content': '这是 CoreBlog 的第二版，采用 Express.js 和 React.js 实现。'
          + ' 这个新版本中包含了很多 UI 更新，且很多功能已经得到增强。',
        'UI.About.Skills': '使用的技术',
        'UI.About.Version.Frontend': '前端版本',
        'UI.About.Version.Backend': '后端版本',
        'UI.About.Bothering': '“时运不济，命运多舛，冯唐易老，李广难封。'
          + '屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时。”',
        'UI.About.EasterEggClick0': '再点击',
        'UI.About.EasterEggClick1': '次进入开发者模式',
        'UI.About.EasterEggClick2': '你已进入开发者模式',
        'UI.User.DidYouLogin.Title': '好像搞错了什么？',
        'UI.User.DidYouLogin.Content': '你似乎还没有登录',
        'UI.User.DidYouLogin.LoginButton': '去登录',
        'UI.User.DidYouLogin.BackButton': '返回',
        'UI.User.UserInfo': '用户信息',
        'UI.User.UserName': '用户名',
        'UI.User.NickName': '昵称',
        'UI.User.Email': 'Email',
        'UI.User.Password': '密码',
        'UI.User.ConfirmPassword': '确认密码',
        'UI.User.ChangePassword': '修改密码',
        'UI.User.Logout': '注销登录',
        'UI.User.BadNickName': '请输入一个合法的昵称',
        'UI.User.BadEmail': '请输入一个有效的 Email',
        'UI.User.UnequalPassword': '两次输入的密码不匹配',
        'UI.User.BadPassword': '请输入一个足够复杂的密码',
        'UI.User.PasswordRequirement': '密码应该至少有 8 位，并且包含大小写字母和数字',
        'UI.User.ConfirmLogout.Title': '确定要登出吗',
        'UI.User.LogoutSuccess': '您已成功登出',

        'UI.Dial.WriteBlog': '撰写博客',
        'UI.Dial.Share': '分享',

        'UI.Dialog.Share': '分享',
        'UI.Dialog.CopyLink': '复制链接',
        'UI.Dialog.Copied': '已复制！',
        'UI.Dialog.Close': '关闭',
        'UI.Dialog.Ok': '确认',
        'UI.Dialog.Cancel': '取消',

        'UI.Search.Title': '在标题中搜索',
        'UI.Search.FullText': '全文搜索',
        'UI.Search.User': '搜索用户',
        'UI.Search.Unimplemented': '此功能尚未实现'
      }
    },
     zh_tw: {
       translation: {
        'User.CreateByAdmin. BadToken': '管理員密匙錯誤'，
        'User.CreateByAdmin. Success': '成功創建用戶'，
        'User.Info. NotFound': '用戶檔案不存在'，
        'User.Info. Success': '成功獲取用戶檔案'，
        'User.Login. Success': '登入成功'，
        'User.Login. NotFound': '用戶名或密碼錯誤'，
        'User.Edit. Success': '修改成功'，
        'User.Edit. Fail': '修改失敗'，
        'Blog.Add. Success': '創建部落格成功'，
        'Blog.Get. NotFound': '部落格不存在或已被删除'，
        'Blog.Get. Success': '獲取部落格資訊成功'，
        'Blog.List. Success': '獲取部落格清單成功'，
        'Blog.Update. NotFound': '部落格不存在或已被删除'，
        'Blog.Update. Unauthorized': '你不是該部落格的作者'，
        'Blog.Update. Success': '更新部落格成功'，
        'Blog.Delete. NotFound': '部落格不存在或已被删除'，
        'Blog.Delete. Unauthorized': '你不是該部落格的作者'，
        'Blog.Delete. Success': '删除部落格成功'，
        'Comment.Add. NotFound': '部落格不存在或已被删除'，
        'Comment.Add. Success': '評論成功'，
        'Comment.Delete. NotFound': '評論不存在或已被删除'，
        'Comment.Delete. Unauthorized': '你不是該評論的作者'，
        'Comment.Delete. Success': '删除評論成功'，
        'Server. InternalError': '服務器遇到問題，請稍候再試'，

                'UI.Format. Time': 'HH:mm'，

                'UI.Format. DateTime': 'M月D日HH:mm'，

                'UI.Format. YearDateTime': 'YYYY年M月D日'，

        'UI.AppBar. Search': '蒐索…'，
        'UI.MainMenu. SetLanguage': '選擇語言'，
        'UI.MainMenu. Login': '登入'，
        'UI.MainMenu. CurrentUser': '當前用戶'，
        'UI.MainMenu. About': '關於CoreBlog'，
        'UI.SetLanguage. Sample': '我能吞下玻璃而不傷身體'，
        'UI.Index. LoadMore': '點擊加載更多'，
        'UI.Index. NoMoreContent': '沒有更多內容了'，
        'UI.Blog. Author': '作者'，
        'UI.Blog. CreateTime': '創建時間'，
        'UI.Blog. UpdateTime': '最後更新'，
        'UI.Blog. CommentCount': '條評論'，
        'UI.BlogEdit. TitleInput': '標題'，
        'UI.BlogEdit. BriefInput': '簡介'，
        'UI.BlogEdit. SaveButton': '保存'，
        'UI.BlogEdit. NeedTitle': '標題不能為空'，
        'UI.BlogEdit. NeedBrief': '簡介不能為空'，
        'UI.BlogEdit. NeedContent': '內容不能為空'，
        'UI.Login. Title': '登入'，
        'UI.Login. Username': '用戶名'，
        'UI.Login. Password': '密碼'，
        'UI.Login. Submit': '登入'，
        'UI.Login. Unfilled': '請填寫所有欄位'，
        'UI.About. Title': '關於'，
        'UI.About. Content': '這是CoreBlog的第二版，採用Express. js和React. js實現。'
+ '這個新版本中包含了很多UI更新，且很多功能已經得到增强。'，
        'UI.About. Skills': '使用的科技'，
        'UI.About.Version. Frontend': '前端版本'，
        'UI.About.Version. Backend': '後端版本'，
        'UI.About. Bothering': '"時運不濟，命運多舛，馮唐易老，李廣難封。'
+ '屈賈誼於長沙，非無聖主； 竄梁鴻於海曲，豈乏明時。”'，
        'UI.About. EasterEggClick0': '再點擊'，
        'UI.About. EasterEggClick1': '次進入開發者模式'，
        'UI.About. EasterEggClick2': '你已進入開發者模式'，
        'UI.User.DidYouLogin. Title': '好像搞錯了什麼？'，
        'UI.User.DidYouLogin. Content': '你似乎還沒有登錄'，
        'UI.User.DidYouLogin. LoginButton': '去登入'，
        'UI.User.DidYouLogin. BackButton': '返回'，
        'UI.User. UserInfo': '用戶資訊'，
        'UI.User. UserName': '用戶名'，
        'UI.User. NickName': '昵稱'，
        'UI.User. Email': 'Email'，
        'UI.User. Password': '密碼'，
        'UI.User. ConfirmPassword': '確認密碼'，
        'UI.User. ChangePassword': '修改密碼'，
        'UI.User. Logout': '註銷登錄'，
        'UI.User. BadNickName': '請輸入一個合法的昵稱'，
        'UI.User. BadEmail': '請輸入一個有效的Email'，
        'UI.User. UnequalPassword': '兩次輸入的密碼不匹配'，
        'UI.User. BadPassword': '請輸入一個足够複雜的密碼'，
        'UI.User. PasswordRequirement': '密碼應該至少有8比特，並且包含大小寫字母和數位'，
        'UI.User.ConfirmLogout. Title': '確定要登出嗎'，
        'UI.User. LogoutSuccess': '您已成功登出'，
        'UI.Dial. WriteBlog': '撰寫部落格'，
        'UI.Dial. Share': '分享'，
        'UI.Dialog. Share': '分享'，
        'UI.Dialog. CopyLink': '複製連結'，
        'UI.Dialog. Copied': '已複製！'，
        'UI.Dialog. Close': '關閉'，
        'UI.Dialog. Ok': '確認'，
        'UI.Dialog. Cancel': '取消'，
        'UI.Search. Title': '在標題中蒐索'，
        'UI.Search. FullText': '全文檢索搜尋'，
        'UI.Search. User': '蒐索用戶'，
        'UI.Search. Unimplemented': '此功能尚未實現'
      }
    },
  },
  lng: getLocalStorage('UI.Language') || 'zh_CN',
  fallbackLng: 'zh_CN',
  interpolation: {
    escapeValue: false
  }
}

export default translation
