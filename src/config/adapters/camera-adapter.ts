import { CameraType, launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker"

export class CameraAdapater {
  static async takePicture(): Promise<string[]> {

    const response = await launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.7,
      aspect: [4, 3],
      cameraType: CameraType.back
    })

    if(response.assets && response.assets[0].uri ) {
      return [response.assets[0].uri]
    }

    return []
  }

  static async getLibrary(): Promise<string[]> {
    const response = await launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.7
    })

    if(response.assets && response.assets.length > 0 ) {
      return response.assets.map(asset => asset.uri)
    }

    return []
  }
}