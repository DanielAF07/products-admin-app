import MyIcon from '@/presentation/components/ui/MyIcon'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, useWindowDimensions } from 'react-native'

const LoginScreen = () => {
  const router = useRouter()
  const { height } = useWindowDimensions()
  
  const { login } = useAuthStore()
  
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) return
    setIsLoading(true)
    const wasSuccessful = await login(form.email, form.password)
    setIsLoading(false)
    if(wasSuccessful) return

    Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 24}}>
        <Layout style={{ paddingTop: height * 0.35, marginBottom: 8 }}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout>
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({...form, email})}
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({...form, password})}
            accessoryLeft={<MyIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={!isLoading ? <MyIcon name='arrow-forward-outline' size={24} white/> : <></>}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading
            ? (<ActivityIndicator />)
            : 'Ingresar'}
            
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={{height: 20}} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>No estas registrado?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => router.navigate('/register')}
          >{' '}Crear cuenta</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
export default LoginScreen