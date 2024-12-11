import React, { useEffect, useState } from 'react'
import { Image, ActivityIndicator, View, TouchableOpacity, Alert } from 'react-native'
import { read, update } from '../services/todo.api.service'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import Ionicon from '@react-native-vector-icons/ionicons'
import { openGallery } from '../services/imagepicker.service'
import { clear } from '../services/asyncstorage.service'

const Profile = ({navigation}: any) => {
  const [condition, setCondition] = useState({
    viewLoading: false,
    buttonLoading: false
  })
  const [form, setForm] = useState({
    username: '',
    email: '',
    avatar: '',
    urlAvatar: '' 
  })

  const getProfile = async() => {
    try {
      setCondition({...condition, viewLoading: true})
      const result = await read('/profile')
      return setForm({...form, username: result.user.username, email: result.user.email, avatar: result.user.avatar?._id, urlAvatar: result.user.avatar?.url })
    } catch (error) {
      return console.log(error)
    } finally {
      return setCondition({...condition, viewLoading: false})
    }
  }

  const updateProfile = async() => {
    try {
      setCondition({...condition, buttonLoading: true})

      const result = await update('/profile', form)
      if(result.status !== 'error') return toast.success('update profile successfully')

      getProfile()
      return toast.error(`Failed : ${result.message}`)
    } catch (error: any) {
      return toast.error(error)
    } finally {
      return setCondition({...condition, buttonLoading: false})
    }
  }

  const updateAvatar = async() => {
    try {
      const image = await openGallery()
      console.log(image)

      const result = await update(`/images/${form.avatar}`, {image: {name: image.path, uri: image.path, type: image.mime}})
      console.log(result)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handlerLogout = () => {
    Alert.alert('Log Out', 'Apakah anda yakin ingin keluar?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: async() => {
        await clear()
        navigation.replace('Login')
      }}
    ])
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <SafeAreaProvider>
      <View style={{ padding: 20, paddingTop: 50, backgroundColor: 'white', alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={handlerLogout}>
          <Ionicon name='power' color='red' size={24} />
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', padding: 25 }}>
        {condition.viewLoading ? (
          <ActivityIndicator color='darkblue' size='large' />
        ) : (
          <>
            <View style={{ alignSelf: 'center', marginBottom: 50 }}>
              <Image source={{ uri: form.urlAvatar ? form.urlAvatar : 'https://cdn.vectorstock.com/i/1000v/17/16/default-avatar-anime-girl-profile-icon-vector-21171716.jpg' }} height={150} width={150} borderRadius={150/2} resizeMode='cover' />
              <TouchableOpacity onPress={updateAvatar} style={{ position: 'absolute', bottom: 10, right: 0, backgroundColor: 'darkblue', padding: 5, borderRadius: 17, borderWidth: 2, borderColor: 'white' }}>
                <Ionicon name='camera-outline' size={24} color='white' />
              </TouchableOpacity>
            </View>
            <FormField placeholder='Enter your username' label='Username' onChangeText={v => setForm({...form, username: v})} value={form.username} />
            <FormField placeholder='Enter your email' label='Email' onChangeText={v => setForm({...form, email: v})} value={form.email} keyboardType='email-address' />
            <CustomButton title='Update Profile' onPress={updateProfile} loading={condition.buttonLoading} />
          </>
        )}
        <Toasts/>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default Profile