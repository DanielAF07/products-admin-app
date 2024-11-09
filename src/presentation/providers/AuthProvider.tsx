import { useNavigation, useRouter } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'
import { useAuthStore } from '../store/auth/useAuthStore'

const AuthProvider = ({children}: PropsWithChildren) => {

  const router = useRouter()
  const {checkStatus, status} = useAuthStore()

  useEffect(() => {
    checkStatus()
  }, [])

  useEffect(() => {
    if(status !== 'checking'){
      if(status === 'authenticated') {
        router.canDismiss ?? router.dismissAll()
        router.replace('/home')
      }
      if(status === 'unauthenticated') {
        router.canDismiss ?? router.dismissAll()
        router.replace('/login')
      }
    }

  }, [status])

  return(
    <>
    {children}
    </>
  )
}
export default AuthProvider