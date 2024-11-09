import { tesloApi } from "@/config/api/tesloApi"
import { User } from "@/domain/entities/user"
import type { LoginResponse } from "@/infrastructure/interfaces/auth.responses"

const returnUserToken = ( data: LoginResponse ) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles
  }

  return {
    user: user,
    token: data.token
  }
}

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase()
  try {
    const { data } = await tesloApi.post<LoginResponse>('/auth/login', {
      email,
      password
    })
    return returnUserToken(data)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const authRegister = async (fullName: string, email: string, password: string) => {
  email = email.toLowerCase()
  try {
    const { data } = await tesloApi.post<LoginResponse>('/auth/register', {
      email,
      password,
      fullName
    })
    return returnUserToken(data)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const authCheckStatus = async () => {
  try {
    const { data } = await tesloApi.get<LoginResponse>('/auth/check-status')
    return returnUserToken(data)
  } catch (error) {
    console.log(error)
    return null
  }
}