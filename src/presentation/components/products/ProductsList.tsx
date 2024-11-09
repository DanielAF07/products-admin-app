import ProductCard from '@/presentation/components/products/ProductCard'
import { Product } from '@/domain/entities/product'
import { useQueryClient } from '@tanstack/react-query'
import { Layout, List } from '@ui-kitten/components'
import { useState } from 'react'
import { RefreshControl } from 'react-native'

interface Props {
  products: Product[]
  fetchNextPage: () => void
}

const ProductsList = ({products, fetchNextPage}: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()

  const onPullToRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    queryClient.invalidateQueries({ queryKey: ['products', 'infinite']})
    setIsRefreshing(false)

  }
  return (
    <List
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({item}) => (<ProductCard product={item} />)}
      ListFooterComponent={() => <Layout style={{height: 150}}/>}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.6}

      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onPullToRefresh}
        />
      }
    />
  )
}
export default ProductsList