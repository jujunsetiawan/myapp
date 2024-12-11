import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, loading, title } : {onPress: () => void, loading: boolean, title: string}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} disabled={loading} onPress={onPress} style={{ padding: 15, backgroundColor: 'darkblue', marginVertical: 15, borderRadius: 5 }}>
        {loading ? (
          <ActivityIndicator color='white' />
        ) : (
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>{title}</Text>
        )}
    </TouchableOpacity>
  )
}

export default CustomButton