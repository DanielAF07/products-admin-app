import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyIcon from '../components/ui/MyIcon';

interface Props {
  title: string;
  subTitle?: string;
  rightAction?: () => void
  rightActionIcon?: string
  rightActionColor?: string

  children: React.ReactNode
}

const MainLayout = ({title, subTitle, rightAction, rightActionIcon, rightActionColor, children}:Props) => {

  const {top} = useSafeAreaInsets()
  const router = useRouter()

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={router.back}
    />
  )

  const RenderRightAction = () => {
    if(rightAction === undefined || rightActionIcon === undefined) return null
    return (
      <TopNavigationAction
        icon={<MyIcon name={rightActionIcon} color={rightActionColor ? rightActionColor : undefined} />}
        onPress={rightAction}
      />
    )
  }

  return (
    <Layout style={{paddingTop: top}}>
      <TopNavigation
        title={title}
        subtitle={subTitle}
        alignment='center'
        accessoryLeft={router.canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={{height: '94%'}}>
        {children}
      </Layout>
    </Layout>
  )
}
export default MainLayout