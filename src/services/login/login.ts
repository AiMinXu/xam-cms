import hyRequest from '..'
import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  userMenus = '/role/' //用法/role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
export function userInfoByIdRequest(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
export function userMenusByRoleIdRequest(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.userMenus + id + '/menu',
    showLoading: false
  })
}
