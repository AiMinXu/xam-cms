import PageModal from '@/components/page-modal'
import { ref } from 'vue'

type CallbcakFn = (item?: any) => void

//modal的hook，调用传入回调函数进行执行
export function usePageModal(newCallback?: CallbcakFn, editCallback?: CallbcakFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  const handleNewDataClick = () => {
    defaultInfo.value = {} //新建用户重新将数据置空
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallback && newCallback()
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }
  return { defaultInfo, pageModalRef, handleNewDataClick, handleEditClick }
}
