import StackNavigator from "@/presentation/navigation/StackNavigator";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { DefaultTheme } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useColorScheme, View } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import AuthProvider from "@/presentation/providers/AuthProvider";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <AppProvider>
      <StackNavigator />
    </AppProvider>
  )
}

const AppProvider = ({children}: PropsWithChildren) => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? eva.dark : eva.light
  const backgroundColor = colorScheme === 'dark'
    ? theme['color-basic-800']
    : theme['color-basic-100']
  
  return (
    <QueryClientProvider client={queryClient}>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} theme={theme}>
      <ThemeProvider value={{
        dark: colorScheme === 'dark',
        colors: {
          primary: theme['color-primary-500'],
          background: backgroundColor,
          card: theme['color-basic-100'],
          text: theme['text-basic-color'],
          border: theme['color-basic-800'],
          notification: theme['color-primary-500'],
        },
        fonts: DefaultTheme.fonts
      }}>
        <AuthProvider>

          {children}

        </AuthProvider>
      </ThemeProvider>
    </ApplicationProvider>
    </QueryClientProvider>
  )
}