import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
 
const Login = ({navigation}: any) => {
  const [condition, setCondition] = useState({
    loading: false
  })
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 25 }}>
      <Text style={{ marginVertical: 50, fontWeight: 'semibold', fontSize: 24 }}>Login Page</Text>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 5 }}>Email</Text>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 2 }}>
          <TextInput placeholder='xxxxx@gmail.com' keyboardType='email-address' onChangeText={v => setForm({...form, email: v})} value={form.email} />
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 5 }}>Password</Text>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 2 }}>
          <TextInput placeholder='Enter your password' secureTextEntry onChangeText={v => setForm({...form, password: v})} value={form.password} />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('Todo')} style={{ padding: 15, backgroundColor: 'darkblue', marginVertical: 15, borderRadius: 5 }}>
        {condition.loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>LOGIN</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Login