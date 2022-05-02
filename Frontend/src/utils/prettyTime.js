import dayjs from 'dayjs'

export const prettyTime = (time, timeFmt, dateTimeFmt, yearDateTimeFmt) => {
  const time1 = dayjs(time)
  const now = dayjs()
  if (time1.isSame(now, 'day')) {
    return time1.format(timeFmt)
  } else if (time1.isSame(now, 'year')) {
    return time1.format(dateTimeFmt)
  } else {
    return time1.format(yearDateTimeFmt)
  }
}
