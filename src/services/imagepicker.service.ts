import ImagePicker from 'react-native-image-crop-picker'

export const openGallery = async() => {
    const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
    })

    return image
}

export const openCamera = async() => {
    const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
    })

    return image
}