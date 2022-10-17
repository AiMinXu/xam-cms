export interface IAccount {
  name: string
  password: string
}

//定义data的类型
export interface ILoginResult {
  token: string
  id: number
  name: string
}
