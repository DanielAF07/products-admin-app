import { getProductsByPage } from '@/actions/products/get-products-by-page'
import ProductsList from '@/presentation/components/products/ProductsList'
import FAB from '@/presentation/components/ui/FAB'
import FullScreenLoader from '@/presentation/components/ui/FullScreenLoader'
import MainLayout from '@/presentation/layouts/MainLayout'
import { useAuthStore } from '@/presentation/store/auth/useAuthStore'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'

const HomeScreen = () => {
  const router = useRouter()
  const {logout} = useAuthStore()
  const queryClient = useQueryClient()
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1h
    initialPageParam: 0,
    queryFn: async (params) => {
      const products = await getProductsByPage(params.pageParam)
      products.forEach((product) => {
        queryClient.setQueryData(['product', product.id], product)
      })
      return products
    },

    getNextPageParam: (lastPage, allPages) => allPages.length
  })

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60, // 1h
  //   queryFn: () => getProductsByPage(0)
  // })

  return (
    <>
      <MainLayout
        title='TesloShop - Products'
        subTitle='App administrativa'
      >
        {/* <Button onPress={logout} >Logout</Button> */}
        {isLoading 
          ? <FullScreenLoader />
          : <ProductsList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />
        }
      </MainLayout>
      <FAB
        iconName='plus-outline'
        onPress={() => router.push({ pathname: '/product', params: { productId: 'new' }})}
        style={{
        position: 'absolute',
        bottom: 32,
        right: 24,
      }}/>
    </>
  )
}
export default HomeScreen