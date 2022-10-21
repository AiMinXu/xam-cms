import { ILoginState } from './login/types'
import { IAnalysis } from './main/analysis/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
  entireRoles: any[] //全部角色
  entireDepartments: any[] //全部部门
  entireMenus: any[]
}

export interface IRootWithMoudle {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysis
}

export type IStoreType = IRootState & IRootWithMoudle
