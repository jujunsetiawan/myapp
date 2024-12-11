import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, LayoutAnimation, Platform, UIManager, Alert, ActivityIndicator } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicon from '@react-native-vector-icons/ionicons'
import ListTodo from '../components/ListTodo'
import FormModal from '../components/FormModal'
import { read } from '../services/todo.api.service'
import { toast, Toasts } from '@backpackapp-io/react-native-toast';

if(Platform.OS === 'android') {
  if(UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Todo = () => {
  const [todo, setTodo] = useState([])

  const [condition, setCondition] = useState({
    openTask: true,
    openCompleted: false,
    loadingView: false,
    loadingList: false,
    loadingButton: false
  })

  const [form, setForm] = useState({
    title: '',
    desc: ''
  })

  const [modal, setModal] = useState({
    add: false,
    edit: false
  })

  const openTask = () => {
    LayoutAnimation.easeInEaseOut()
    setCondition({...condition, openTask: !condition.openTask})
  }

  const openCompleted = () => {
    LayoutAnimation.easeInEaseOut()
    setCondition({...condition, openCompleted: !condition.openCompleted})
  }

  const onRequestCloseModal = () => {
    setModal({ add: false, edit: false })
    setForm({ title: '', desc: '' })
  }

  const onEdit = (v : {title: string, desc: string}) => {
    setModal({ ...modal, edit: true })
    setForm({title: v.title, desc: v.desc})
  }

  const onDeleteTask = (id: string, title: string) => {
    Alert.alert('Delete Task!', `Anda akan menghapus task id ${id} dengan title ${title}`, [
      { text: 'Cancel', onPress: () => {}},
      { text: 'Yakin', onPress: () => {} }
    ])
  }

  const getAllTodo = async() => {
    try {
      setCondition({ ...condition, loadingView: true })

      const result = await read('/todos')
      setTodo(result.data.todos)
  
      return result
    } catch (error: any) {
      return toast.error(error)
    } finally {
      return setCondition({ ...condition, loadingView: false })
    }
  }

  useEffect(() => {
    getAllTodo()
  }, [])

  return (
    <SafeAreaProvider>
      <View style={{ paddingTop: 50, padding: 20, backgroundColor: 'darkblue', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity>
          <Ionicon name='filter' size={24} color='white' />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'semibold' }}>Todolist</Text>
        <TouchableOpacity onPress={() => setModal({...modal, add: true})}>
          <Ionicon name='add-circle-outline' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {condition.loadingView ? <ActivityIndicator size='large' color='darkblue' /> : todo.length !== 0 ? (
            <>
              <TouchableOpacity onPress={openTask} activeOpacity={0.5} style={{ flexDirection: 'row', padding: 5, alignItems: 'center', marginBottom: 20, width: 60 }}>
                <Text style={{ marginRight: 10 }}>Task</Text>
                <Ionicon name={condition.openTask ? 'chevron-down' : 'chevron-forward'} size={14} />
              </TouchableOpacity>

              {todo.map((v: {_id: string, title: string, desc: string, checked: boolean}, i) => condition.openTask && <ListTodo key={i} title={v.title} desc={v.desc} isCompleted={v.checked} onCompleted={() => {}} isEdit={() => onEdit(v)} isLoading={condition.loadingList} onDelete={() => onDeleteTask(v._id, v.title)} />)}

              <TouchableOpacity onPress={openCompleted} style={{ flexDirection: 'row', padding: 5, alignItems: 'center', marginBottom: 20, width: 100 }}>
                <Text style={{ marginRight: 10 }}>Completed</Text>
                <Ionicon name={condition.openCompleted ? 'chevron-down' : 'chevron-forward'} size={14} />
              </TouchableOpacity>

              {todo.map((v: {_id: string, title: string, desc: string, checked: boolean}, i) => condition.openCompleted && <ListTodo key={i} title={v.title} desc={v.desc} isCompleted={v.checked} onCompleted={() => {}} isEdit={() => onEdit(v)} isLoading={condition.loadingList} onDelete={() => onDeleteTask(v._id, v.title)} />)}

            </>
          ) : (
            <>
              <Image source={{ uri: 'https://i.ibb.co.com/XFKh9Jc/Checklist-rafiki-1.png' }} height={250} width={250} resizeMode='contain' style={{ alignSelf: 'center', marginTop: 75 }} />
              <Text style={{ fontSize: 18, textAlign: 'center' }}>What do you want to do today?</Text>
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Tap + to add your tasks</Text>
            </>
          )}
        </ScrollView>
        <Toasts/>
      </GestureHandlerRootView>

      <FormModal title={modal.add ? 'Add Task' : 'Detail Task'} visible={modal.add || modal.edit} taskTitle={form.title} taskDesc={form.desc} onRequestClose={onRequestCloseModal} onChangeTaskTitle={v => setForm({...form, title: v})} onChangeTaskDesc={v => setForm({...form, desc: v})} buttonTitle={modal.add ? 'Add Task' : 'Edit Task'} buttonLoading={condition.loadingButton} onPressButton={() => {}} />
    </SafeAreaProvider>
  )
}

export default Todo