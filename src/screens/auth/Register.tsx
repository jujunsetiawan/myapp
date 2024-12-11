import React, { useState } from 'react'
import { Text, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { create } from '../../services/todo.api.service'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { store } from '../../services/asyncstorage.service'

const Register = ({navigation}: any) => {
  const [condition, setCondition] = useState({
    loading: false
  })
  
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handlerRegister = async() => {
    try {
      setCondition({...condition, loading: true})
      const result = await create('/auth/register', form)
      if(result.status !== 'success') return ToastAndroid.show(result.message, ToastAndroid.LONG)
      await store('user', {email: form.email, token: result.user.token})
      return navigation.replace('Todo')
    } catch (error: any) {
      return ToastAndroid.show(error.message, ToastAndroid.LONG)
    } finally {
      setCondition({...condition, loading: false})
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 25 }}>
      <Text style={{ marginVertical: 50, fontWeight: 'semibold', fontSize: 24 }}>Register Page</Text>
      <FormField label='Username' placeholder='username' value={form.username} onChangeText={(v: string) => setForm({...form, username: v})} />
      <FormField label='Email' placeholder='xxxxx@gmail.com' keyboardType='email-address' value={form.email} onChangeText={(v: string) => setForm({...form, email: v})} />
      <FormField label='Password' placeholder='Enter your password' secureTextEntry value={form.password} onChangeText={(v: string) => setForm({...form, password: v})} />
      <FormField label='Confirm Password' placeholder='Enter your password' secureTextEntry value={form.confirmPassword} onChangeText={(v: string) => setForm({...form, confirmPassword: v})} />
      <Text>You have an account ? <Text onPress={() => navigation.replace('Login')}>Login</Text></Text>
      <CustomButton title='REGISTER' loading={condition.loading} onPress={handlerRegister} />
    </SafeAreaView>
  )
}

export default Register