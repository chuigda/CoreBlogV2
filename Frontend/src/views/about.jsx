import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import {
  Card, CardContent, Divider, IconButton, Tooltip, Typography
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import { useTranslation } from 'react-i18next'

const howVagatableIAm = String.raw`我好菜啊
我菜爆了
我是什么垃圾
我好堕落
我失败了
我没有未来 我好苦恼
我好菜菜啊 再这样下去就没人要了 我就只能混吃等死了
我越来越觉得自己是废物一个 越来越觉得自己毫无水平
大佬都这么强 而我呢 哭哭
唉 能理解我菜的人真的不多
有些人啊 整天就知道卖弱 不像我 是什么水平 就是什么水平
我这种就只能靠 天天清理点代码 否则迟早被辞退 
我已经感受到被大佬摁在地上摩擦的恐惧了
你们可以约我奶茶 同我讲我不行的故事
幸亏垃圾公司招的人多 不然我这种闲鱼进不来
我真的好羡慕那些 不用学 也可以满绩的 我真的不一样 我去年真的是 学到自闭 没有办法 毕竟水平不行
我就整天学一些 学了没用的东西
我看不到历史的进程 我觉得我也快被淘汰了
我已经预感到我后面的年假有多悲惨了
我是什么水平 就说自己是什么水平 我像是会卖弱的人吗
吾日三省吾身 每天起床第一句 Chuigda 世界最菜
我是一条酸菜鱼 又酸又菜又多余
为什么大佬都是学得又快又多又好 可我呢 就学这么点东西 整天还学的快要自闭了
什么也不会 什么都不行.png
我随时都可以让你觉得自己很强
为什么别人的数学都能证出来 我连题目也看不懂 求大佬指导
唉 想想自己已经荒废了这么多年 我还能做什么呢
我觉得我对我自己有多菜 一直有比较清晰的认识
我的脑子就是知识的筛子 以至于我什么都不会
唉 我能力有限 水平有限
我太菜了 可没人觉得我菜 这就很让人苦恼
大佬们不仅比我努力 还比我聪明 我是怎么活到现在的
为什么要学习呢 gpa 高了我菜 gpa 低了我还是菜
我真是又菜又弱小
我好菜 因为太菜 和大家格格不入
不好意思我就是菜 我菜到大家了 我道歉
是我觉得自己太菜了 所以要把菜带给更多的人 这样大家就知道 菜也没关系 总有更菜的 Chuigda 给你们垫底
我这种保研也没得保 出国也没学校要 啥也不想干 天天就想堕落
我觉得我讲自己菜的故事 可以讲一晚上 而且真的很菜
我真的搞不懂了 为什么公司会招我这种 在青大排倒数的菜鸡
真的是把我招过来 给大家虐 给大家找自信的吗
像我这种 slightly above average 的菜鸡是没有未来的 我太菜了
我现在就是学习也不行 钱也没有 人也老了
我混吃等死 就打打工这样子才能生活得下去
我怕不是两年以后也找不到工作了
只有菜鸡需要刻苦 而我是菜中之菜
突然觉得自己好失败  大学四年一晃而过  我卷不过别人 做不了嗑盐 写不动程序 听不懂课  我仿佛是个废物  
我太菜了  在简历里只敢写自己有 basic understanding 和 beginner’s experience  想想我的大学四年 我就感觉自己和废物没什么差别  
我和时代脱节了
大家个个都是人才  只有我这种又弱小又菜 还不努力的人 唯二的选择就是躲在角落里瑟瑟发抖 深夜在浅粉色床单上默默哭泣  
我这种废物 只能躺平  
我是什么品种的废物 有人告诉我吗？
我的一生 除了失败就是堕落 到现在一事无成  
用三个词形容自己：菜 底层 一事无成
从今天起 躺平 等死 做一个快乐的废物
我要深入研究一下我这种废物是怎么做到如此失败的  
有人喜欢挑战自己 而我这种废物就只想混吃等死 早点接受社会的毒打 免得过几年没 HC 了
唉 想想我进 CS 的故事 就是历史的进程
我这种废物进了 CS 变得更废物了 什么都不会 什么也不行 嗑盐不会 学习不行 就业根本没人带 唯一的出路就是混吃等死
唉 我就想早点混吃等死早点就业 我没有学术理想 我不适合磕盐
我也没想到我会进 CS 也没想到我的大学生活是混吃等死 再过几年会是什么样子呢 不敢想 说不定我就要失业了
我反正只想赶紧去赚钱 在失业以前赚够钱
现在想想自己努力了四年的代码量 没什么用 还是要靠有人带 不会有人因为代码写的多而觉得你很强 觉得你可以做什么事情 这是我从我失败的两年里总结出来的
我在十月份以前也想不到我这种废物也能进 CS 然而进来以后才发现 自己只能在这里越变越菜 看着同学 paper 发到手软 自己瑟瑟发抖
就像我这种废物 嗑盐不行 学习不行 啥也不行 就只能早早去找实习 毕业混吃等死 赶紧赚钱退休 免得过几年只能睡在大街上
我还是想讲一讲我当年进青大的故事 我这种废物是怎么进来的 不仅如此还进了 CS 我流泪了 这就是历史的进程啊
又更新了一波 profile 越写越想流泪 越写越觉得自己是白非立
我过去的十八年 不是努力了十八年 而是历史进程中的十八年 大学的四年是更加失败的两年 大学四年是我不努力 也没有把握历史的进程
我最大的幸运 就是已经认识到了自己的不足 自己的上限 然后选择躺平 选择混吃等死
昨夜睡前 在床上思考如何写简历 久久未能入眠（是的我又失眠了）  想想我的大学四年和工作后的两年 一事无成 想不出什么“成功”经历 我只能深夜在我的浅粉色床单上默默哭泣  
做题能解决的事情 都不是事  只可惜我的人生已过了二十年 我才认识到这个道理  花了太多时间做题 最后什么也没学到 这就是我的失败人生了
做资本家的韭菜 这是我的唯一出路 早被割完早退休
正在学习做一个低欲望的人 比如代码 工资 paper 这种执念 早该放下了 只可惜我已经毕业了一年多 我才放下了对嗑盐的执念
还是要感谢南科大的老师 早在六年前招生的时候就预见了我现在没有数理基础 做不了嗑盐 只能混吃等死的结局 然后把我拒了  否则我现在肯定被同学碾的渣也不剩 看着别人一作顶会闭着眼睛投 躺拿四大 offer 而自己在实验室里啥也干不了 最后被迫退学 年年补考 连毕业都困难 成为失败中最失败的那一种废物  
想被大佬吊打 打醒我废物的一生
我觉得我的失败是命中注定`

const itemList = howVagatableIAm.split('\n')

const About = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [counter, setCounter] = useState(10)

  const handleEasterEggClick = () => {
    if (counter > 0) {
      setCounter(counter - 1)
      if (counter <= 4 && counter > 1) {
        enqueueSnackbar(
          `${t('UI.About.EasterEggClick0')} ${counter - 1} ${t('UI.About.EasterEggClick1')}`,
        )
      } else if (counter === 1) {
        enqueueSnackbar(
          `${t('UI.About.EasterEggClick2')}`,
          { variant: 'success' }
        )
      }
    }
  }

  const openGitHub = () => window.open('https://github.com/chuigda/CoreBlogV2')
  const openCoreBlogV1 = () => window.open('http://120.78.128.153/coreblog/index.php')

  if (counter !== 0) {
    return (
      <Card>
        <CardContent sx={{ position: 'relative' }}>
          <Typography variant="h6">{t('UI.About.Title')}</Typography>
          <Divider style={{
            marginTop: 4,
            marginBottom: 4
          }}/>
          <Typography variant="body1">{t('UI.About.Content')}</Typography>
          <Typography variant="body1">
            {t('UI.About.Skills')}
            {': '}
            <span className="iconfont icon-node-js"/>NodeJS &nbsp;
            <span className="iconfont icon-mongo-db"/>MongoDB &nbsp;
            <span className="iconfont icon-redis"/>Redis &nbsp;
            <span className="iconfont icon-react"/>React &nbsp;
            <span className="iconfont icon-material-ui"/>MaterialUI &nbsp;
          </Typography>
          <Typography variant="body1">
            {t('UI.About.Version.Frontend')}
            {': '}
            1.0.0-ALFA
          </Typography>
          <Typography variant="body1">
            {t('UI.About.Version.Backend')}
            {': '}
            1.0.0-ALFA
          </Typography>
          <Typography variant="body1">
            {t('UI.About.Bothering')}
          </Typography>
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Tooltip title="Go to GitHub">
              <IconButton size="large" onClick={openGitHub}>
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Visit CoreBlog V1 site">
              <IconButton size="large" onClick={openCoreBlogV1}>
                <LooksOneIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            userSelect: 'none',
            width: '50px',
            height: '50px'
          }} onClick={handleEasterEggClick} />
        </CardContent>
      </Card>
    )
  } else {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{t('UI.About.Title')}</Typography>
          <Divider style={{ marginTop: 4, marginBottom: 4 }} />
          <Typography variant="body1">
            {
              itemList.map((item, index) => (
                <div key={`vagatable-${index}`}>
                  {item}
                </div>
              ))
            }
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default About
