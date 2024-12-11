import React, { useState } from 'react'
import { Text, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { create } from '../../services/todo.api.service'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { store } from '../../services/asyncstorage.service'

const Login = ({navigation}: any) => {
  const [condition, setCondition] = useState({
    loading: false
  })
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handlerLogin = async() => {
    try {
      setCondition({...condition, loading: true})
      const result = await create('/auth/login', form)
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
      <Text style={{ marginVertical: 50, fontWeight: 'semibold', fontSize: 24 }}>Login Page</Text>    
      <FormField label='Email' placeholder='xxxxx@gmail.com' keyboardType='email-address' value={form.email} onChangeText={(v: string) => setForm({...form, email: v})} />
      <FormField label='Password' placeholder='Enter your password' secureTextEntry value={form.password} onChangeText={(v: string) => setForm({...form, password: v})} />
      <Text>don't have an account ? <Text onPress={() => navigation.replace('Register')}>Register</Text></Text>
      <CustomButton title='LOGIN' loading={condition.loading} onPress={handlerLogin} />
    </SafeAreaView>
  )
}

export default Login