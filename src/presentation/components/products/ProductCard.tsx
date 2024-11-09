import { Product } from '@/domain/entities/product'
import { FadeInImage } from '@/presentation/components/ui/FadeInImage'
import { Card, Text } from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { Image, ImageProps, ImageStyle, StyleProp } from 'react-native'

interface Props {
  product: Product
}

const ProductCard = ({product}: Props) => {

  const router = useRouter()

  const imageStyle: StyleProp<ImageStyle> = { width: '100%', height: 200 }

  return (
    <Card
      style={{flex: 1, backgroundColor: '#f9f9f9', margin: 3}}
      onPress={() => router.push({ pathname: '/product', params: { productId: product.id }})}
    >
      {product.images.length === 0
        ? (
          <Image
            source={require('@/assets/images/no-product-image.png')}
            style={imageStyle}
          />
        )
        : (
          <FadeInImage
            uri={product.images[0]}
            style={[imageStyle, {flex: 1}]}
          />
        )
      }

      <Text
        numberOfLines={2}
        style={{textAlign: 'center'}}
      >
        {product.title}
      </Text>
      <Text
        numberOfLines={1}
        style={{textAlign: 'center', fontWeight: 'bold', marginTop: 4}}
      >
        ${product.price}
      </Text>

    </Card>
  )
}
export default ProductCard