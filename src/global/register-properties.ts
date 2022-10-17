import { utcToDateTimeFormat } from '@/utils/date-formt'
import { App } from 'vue'

//定义
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    showStatus(enable: boolean) {
      return enable ? '启用' : '禁用'
    },
    formatTime(value: string) {
      return utcToDateTimeFormat(value)
    }
  }
}
