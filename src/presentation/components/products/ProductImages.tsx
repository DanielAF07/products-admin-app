import { Button, Card, Layout, useTheme } from '@ui-kitten/components'
import { FlatList, Image } from 'react-native'
import { FadeInImage } from '../ui/FadeInImage'
import MyIcon from '../ui/MyIcon'
import * as ImagePicker from 'expo-image-picker';
import { CameraAdapater } from '@/config/adapters/camera-adapter';

interface Props {
  images: string[]
  onNewImages: (images: string[]) => void
}

const imageSize = {
  width: 300,
  height: 300
}

const ProductImages = ({images, onNewImages }: Props) => {

  const theme = useTheme()

  const handleNewImages = async () => {
    const photos = await CameraAdapater.takePicture()
    if (onNewImages) return onNewImages(photos)
  }

  const NewImage = () => {
    return (
      <Card
        onPress={handleNewImages}
        style={[imageSize, {flex: 1, backgroundColor: theme['color-basic-300'], justifyContent: 'center', alignItems: 'center'}]}
      >
        <Layout style={{backgroundColor: theme['color-primary-500'], padding: 4, borderRadius: 8 }}>
          <MyIcon name='plus-outline' white />
        </Layout>
      </Card>
    )
  }

  return (
    <Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
      {images.length === 0
        ? <NewImage />
        : (
            <FlatList
              data={images}
              horizontal
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <FadeInImage uri={item} style={[imageSize, { marginHorizontal: 8}]} />
              )}
              ListFooterComponent={<NewImage />}
            />
        )
      }
    </Layout>
  )
}


export default ProductImages