import { tesloApi } from "@/config/api/tesloApi"
import { Gender, Product } from "@/domain/entities/product"
import { TesloProduct } from "@/infrastructure/interfaces/teslo-products.responses"
import { ProductMapper } from "@/infrastructure/mappers/product.mapper"

const emptyProduct: Product = {
  id: '',
  title: '',
  description: '',
  price: 0,
  images: [],
  slug: '',
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: []
}

export const getProductById = async (id: string): Promise<Product> => {
  try {
    if (id === 'new') return emptyProduct
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`)
    const product = ProductMapper.tesloProductToEntity(data)
    return product
  } catch (error) {
    console.error(error)
    throw new Error('Error getting product by id')
  }
}