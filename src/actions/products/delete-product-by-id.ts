import { tesloApi } from "@/config/api/tesloApi";

export const deleteProductById = async (id: string) => {
  try {
    const { data } = await tesloApi.delete(`/products/${id}`)
    return data
  } catch (error) {
    throw new Error("Error deleting a product")
  }
}