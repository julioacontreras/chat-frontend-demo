import { login } from '@/api/login'
import type { DataResponseAuth } from '../types/data-response-auth'
import type { StatusCode } from '@/ddd/modules/shared/types/status-code'

export type AuthResponse = {
  data: DataResponseAuth | null
  status: StatusCode
}

export class AuthRepository {
  async login(username: string, password: string): Promise<AuthResponse> {
    let data = null
    let statucCode = 0
    await login(username, password, (dataResponse: DataResponseAuth | null, status: StatusCode) => {
      statucCode = status
      if (statucCode !== 200) {
        return
      }
      data = dataResponse
    })
    return {
      data,
      status: statucCode
    }
  }
}
