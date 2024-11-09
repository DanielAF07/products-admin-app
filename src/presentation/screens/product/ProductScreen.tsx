import { useRef } from 'react'
import { ScrollView, FlatList, Alert, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { Formik } from 'formik'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, ButtonGroup, Input, Layout, useTheme, Text } from '@ui-kitten/components'

import { Product } from '@/domain/entities/product'
import FullScreenLoader from '@/presentation/components/ui/FullScreenLoader'
import MyIcon from '@/presentation/components/ui/MyIcon'
import MainLayout from '@/presentation/layouts/MainLayout'
import ProductImages from '@/presentation/components/products/ProductImages'
import { deleteProductById, updateCreateProduct, getProductById } from '@/actions/products'
import { GENDERS, SIZES } from '@/config/constants/product.constants'

const ProductScreen = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { productId }: { productId: string } = useLocalSearchParams()
  const productIdRef = useRef(productId)

  const theme = useTheme()

  const { isLoading, data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  })

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess: (data: Product) => {
      console.log('Success')
      productIdRef.current = data.id // When it creates a new product
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['product', data.id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (data: Product) => await deleteProductById(data.id),
    onSuccess: (data: Product) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] })
      queryClient.invalidateQueries({ queryKey: ['product', data.id] })
      router.dismiss()
    },
  })

  const alertDelete = () => {
    Alert.alert('Confirm Deletion', 'This action cannot be undone. Do you really want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete Item',
        onPress: () => deleteMutation.mutate(product!),
        style: 'destructive',
      },
    ]);
  }

  if(isLoading || !product) {
    return (
      <MainLayout title="Loading...">
        <FullScreenLoader />
      </MainLayout>
    )
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={mutation.mutate}
    >
      {
        ({handleChange, handleSubmit, values, errors, setFieldValue}) => (
          <MainLayout
            title={values.title}
            subTitle={`Price: $${values.price}`}
            rightAction={alertDelete}
            rightActionIcon='trash-2-outline'
            rightActionColor='color-danger-500'
          >
            <ScrollView style={{flex: 1}}>
            
              {/* Images */}
              <ProductImages images={values.images} onNewImages={(images) => {
                setFieldValue('images', [...values.images, ...images])
              }} />

              {/* Form */}
              <Layout style={{marginHorizontal: 16}}>
                <Input
                  label='Title'
                  style={{marginVertical: 4}}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label='Slug'
                  style={{marginVertical: 4}}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />
                <Input
                  label='Description'
                  numberOfLines={4}
                  multiline
                  style={{marginVertical: 4}}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </Layout>

              <Layout style={{ marginVertical: 4, marginHorizontal: 16, flexDirection: 'row', gap: 8}}>
                <Input
                  label='Price'
                  keyboardType='decimal-pad'
                  style={{flex: 1}}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                />
                <Input
                  label='Stock'
                  keyboardType='number-pad'
                  style={{flex: 1}}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                />
              </Layout>

              {/* Selectors */}

              <ButtonGroup
                style={{ margin: 2, marginTop: 24, marginHorizontal: 16}}
                size='small'
                appearance='outline'
              >
                {SIZES.map(size => (
                  <Button
                    key={size}
                    onPress={() => setFieldValue('sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size]
                      )}
                    style={{
                      flex: 1,
                      backgroundColor: values.sizes.includes(size) ? theme['color-primary-300'] : undefined
                    }}
                  >
                    <Text numberOfLines={1}>{size}</Text>
                  </Button>
                ))}
              </ButtonGroup>

              <ButtonGroup
                style={{ margin: 2, marginTop: 24, marginHorizontal: 16}}
                size='small'
                appearance='outline'
              >
                {GENDERS.map(gender => (
                  <Button
                    key={gender}
                    onPress={() => setFieldValue('gender', gender)}
                    style={{
                      flex: 1,
                      backgroundColor: values.gender === gender ? theme['color-primary-300'] : undefined
                    }}
                  >
                    <Text style={{textTransform: 'capitalize'}} numberOfLines={1}>{gender.toUpperCase()}</Text>
                  </Button>
                ))}
              </ButtonGroup>

              <Button
                accessoryLeft={<MyIcon name="save-outline" size={24} white/>}
                onPress={() => handleSubmit()}
                style={{ margin: 16 }}
                disabled={mutation.isPending}
              >
                Save
              </Button>

              <Layout style={{height: 200}}/>
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>
  )
}
export default ProductScreen