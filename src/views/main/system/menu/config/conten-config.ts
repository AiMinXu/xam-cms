export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '级别', minWidth: '80' },
    { prop: 'url', label: '菜单url', minWidth: '120' },
    { prop: 'icon', label: '菜单icon', minWidth: '120' },
    { prop: 'sort', label: '排序', minWidth: '80' },
    { prop: 'permission', label: '权限', minWidth: '150' },
    { prop: 'createAt', label: '创建时间', minWidth: '220', slotName: 'create' },
    { prop: 'updateAt', label: '更新时间', minWidth: '220', slotName: 'update' },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false,
  //需要展开的属性通过配置
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
