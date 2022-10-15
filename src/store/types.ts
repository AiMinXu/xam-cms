import { ILoginState } from './login/types'

export interface IRootState {
  // name: string
  // entireRoles: any[]
  // entireDepartments: any[]
  // entireMenus: any[]
}

export interface IRootWithMoudle {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithMoudle
