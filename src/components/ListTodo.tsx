import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicon from '@react-native-vector-icons/ionicons'

const ListTodo = ({ isLoading, onCompleted, isCompleted, isEdit, title, desc, onDelete } : {isLoading: boolean, onCompleted: () => void, isCompleted: boolean, isEdit: () => void, title: string, desc: string, onDelete: () => void}) => {
  return (
    <View style={{ padding: 20, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: 'darkblue', marginBottom: 20, opacity: isCompleted ? 0.5 : 1 }} >
        {isLoading ? <ActivityIndicator color='darkblue' /> : (
            <>
                <TouchableOpacity onPress={onCompleted}>
                    <Ionicon name={isCompleted ? 'radio-button-on' : 'radio-button-off'} size={24} color='green' />
                </TouchableOpacity>
                <TouchableOpacity  onPress={isEdit} style={{ width: '75%' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'semibold', textDecorationLine: isCompleted ? 'line-through' : 'none' }}>{title}</Text>
                    <Text numberOfLines={1} style={{ marginTop: 5, opacity: 0.5, textDecorationLine: isCompleted ? 'line-through' : 'none' }} >{desc}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicon name='trash' size={24} color='red' />
                </TouchableOpacity>
            </>
        )}
    </View>
  )
}

export default ListTodo