import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const StackNavigator = () => {

  return (
    <>
    <StatusBar style='auto' />
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name='loading' options={{ animation: 'fade' }} />
      <Stack.Screen name='login' options={{ animation: 'fade' }} />
      <Stack.Screen name='register' options={{ animation: 'fade' }} />
      <Stack.Screen name='home' options={{ animation: 'fade' }} />
      <Stack.Screen name='product'/>
    </Stack>
    </>
  )
}
export default StackNavigator