import { Layout, Spinner } from '@ui-kitten/components'
const LoadingScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner status='primary' size='large'/>
    </Layout>
  )
}
export default LoadingScreen