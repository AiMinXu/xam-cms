import PageContent from '@/components/page-content'
import { ref } from 'vue'

//封装重置/搜索按钮逻辑hook
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>() //ref获取组件对象

  //重置按钮点击逻辑(emit函数)
  const handleResetClick = () => {
    pageContentRef.value?.getPageData() //调用pageContent中的getPageData函数重新获取页面数据
  }
  //查询按钮点击逻辑
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo) //调用pageContent中的getPageData函数并传入queryInfo参数，发送请求获取相应页面数据
  }

  return { pageContentRef, handleResetClick, handleQueryClick } //k看成是一个元组
}
