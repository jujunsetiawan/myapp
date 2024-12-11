import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import FormField from './FormField'
import CustomButton from './CustomButton'

const FormModal = ({visible, onRequestClose, title, taskTitle, onChangeTaskTitle, taskDesc, onChangeTaskDesc, buttonTitle, buttonLoading, onPressButton}: {visible: boolean, onRequestClose: () => void, title: string, taskTitle: string, onChangeTaskTitle: (v: string) => void, taskDesc: string, onChangeTaskDesc: (v: string) => void, buttonTitle: string, buttonLoading: boolean, onPressButton: () => void}) => {
  return (
    <Modal animationType='slide' transparent visible={visible} onRequestClose={onRequestClose}>
        <TouchableOpacity activeOpacity={1} onPress={onRequestClose} style={{flex: 1, justifyContent: 'center', backgroundColor: '#00000090'}}>
          <View style={{ padding: 20, margin: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'semibold', marginBottom: 20 }}>{title}</Text>
            <FormField label='Title' placeholder='Enter task title' value={taskTitle} onChangeText={onChangeTaskTitle}  />
            <FormField label='Description' placeholder='Enter task description' value={taskDesc} onChangeText={onChangeTaskDesc}  />
            <CustomButton title={buttonTitle} loading={buttonLoading} onPress={onPressButton} />
          </View>
        </TouchableOpacity>
    </Modal>
  )
}

export default FormModal