import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  // name: string
  // entireRoles: any[]
  // entireDepartments: any[]
  // entireMenus: any[]
}

export interface IRootWithMoudle {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithMoudle
