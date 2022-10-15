export const accountRules = {
  //通过:rules='accountRules'绑定el-form再给每个item通过prop绑定对应规则
  name: [
    // trigger:触发情况，blur，change
    { required: true, message: '用户名是必填项', trigger: 'blur' },
    { pattern: /^[a-z0-9]{5,10}$/, message: '用户名必须为5-10个字母数字', trigger: 'blur' } //内容正则
  ],
  password: [
    // trigger:触发情况，blur，change
    { required: true, message: '密码是必填项', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '用户名必须为3个以上字母数字', trigger: 'blur' } //内容正则
  ]
}
