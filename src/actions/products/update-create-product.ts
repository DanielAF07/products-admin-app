import { tesloApi } from "@/config/api/tesloApi";
import { Product } from "@/domain/entities/product";
import { TesloProduct } from "@/infrastructure/interfaces/teslo-products.responses";
import { ProductMapper } from "@/infrastructure/mappers/product.mapper";
import { isAxiosError } from "axios";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock)
  product.price = Number(product.price)

  // If exists -> update
  if(product.id !== 'new') {
    return updateProduct(product)
  }

  return createProduct(product)
}

const prepareImages = async (images: string[]) => {
  const filesToUpload = images.filter(image => image.startsWith('file://'))
  const currentImages = images.filter(image => !image.startsWith('file://'))

  // Upload new files
  if(filesToUpload.length > 0) {
    const uploadPromises = filesToUpload.map(uploadImage)
    const uploadedImages = await Promise.all(uploadPromises)
    currentImages.push(...uploadedImages)
  }

  return currentImages.map(image => image.split('/').pop())
}

const uploadImage = async (image: string) => {
  const formData = new FormData()
  const imageData = {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop() || 'image.jpeg'
  }
  //@ts-ignore
  formData.append('file', imageData)

  const { data } = await tesloApi.post('/files/product', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data.image
}

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const {id, images = [], ...rest} = product

  try {
    const checkedImages = await prepareImages(images)
    const { data } = await tesloApi.post<TesloProduct>(`/products/`, {
      images: checkedImages,
      ...rest
    })

    return ProductMapper.tesloProductToEntity(data)
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error('Error creating product')
  }
}

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product

  try {
    const checkedImages = await prepareImages(images)
    const { data } = await tesloApi.patch<TesloProduct>(`/products/${id}`, {
      images: checkedImages,
      ...rest
    })
    return ProductMapper.tesloProductToEntity(data)
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data)
    }
    throw new Error('Error updating product')
  }
}