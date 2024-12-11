import React from 'react'
import { View, Text, TextInput } from 'react-native'

const FormField = ({label, placeholder, keyboardType='default', secureTextEntry=false, onChangeText, value} : {label?: string, placeholder: string, keyboardType?: any , secureTextEntry?: boolean, onChangeText: (v: string) => void, value: string}) => {
  return (
    <View style={{ marginBottom: 10 }}>
        {label && <Text style={{ marginBottom: 5 }}>{label}</Text>}
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 2 }}>
          <TextInput placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={secureTextEntry} onChangeText={onChangeText} value={value} />
        </View>
    </View>
  )
}

export default FormField