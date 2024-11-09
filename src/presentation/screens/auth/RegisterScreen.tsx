import MyIcon from '@/presentation/components/ui/MyIcon'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const router = useRouter()
  const { height } = useWindowDimensions()
  const { register } = useAuthStore()

  const updateForm = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const handleSubmit = async () => {
    if(form.fullName.length === 0 || form.email.length === 0 || form.password.length === 0) return
    setIsLoading(true)
    await register(form.fullName, form.email, form.password)
    setIsLoading(false)
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 24}}>
        <Layout style={{ paddingTop: height * 0.30, marginBottom: 8 }}>
          <Text category='h1' >Crear cuenta</Text>
          <Text category='p2' >Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout>
          <Input
            placeholder='Full Name'
            autoCapitalize='words'
            autoComplete='name'
            accessoryLeft={<MyIcon name='person-outline' />}
            style={{ marginBottom: 10 }}
            value={form.fullName}
            onChangeText={(value) => updateForm('fullName', value)}
          />
          <Input
            placeholder='E-mail'
            keyboardType='email-address'
            autoComplete='email'
            autoCapitalize='none'
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
            value={form.email}
            onChangeText={(value) => updateForm('email', value)}
          />
          <Input
            placeholder='Password'
            autoCapitalize='none'
            autoComplete='new-password'
            secureTextEntry
            accessoryLeft={<MyIcon name='lock-outline' />}
            value={form.password}
            onChangeText={(value) => updateForm('password', value)}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={!isLoading ? <MyIcon name='arrow-forward-outline' size={24} white/> : <></>}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            Ingresar
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
          <Text>Ya tienes una cuenta?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => router.dismiss()}
          >{' '}Ingresar</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
export default RegisterScreen