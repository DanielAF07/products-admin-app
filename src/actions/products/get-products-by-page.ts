import { tesloApi } from "@/config/api/tesloApi"
import { Product } from "@/domain/entities/product"
import { TesloProduct } from "@/infrastructure/interfaces/teslo-products.responses"
import { ProductMapper } from "@/infrastructure/mappers/product.mapper"

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
  try {
    const offset = page * limit
    const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${offset}&limit=${limit}`)
    const products = data.map(ProductMapper.tesloProductToEntity)
    return products
  } catch (error) {
    console.error(error)
    throw new Error('Error getting products by page')
  }
}