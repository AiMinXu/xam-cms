import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc) //使用utc函数

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function utcToDateTimeFormat(utcDate: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcDate).utcOffset(8).format(format)
}
