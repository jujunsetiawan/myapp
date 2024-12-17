import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, LayoutAnimation, Platform, UIManager, Alert, ActivityIndicator, Modal, TextInput, Button } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Ionicon from '@react-native-vector-icons/ionicons'
import ListTodo from '../components/ListTodo'
import FormModal from '../components/FormModal'
import { create, destroy, read, update } from '../services/todo.api.service'
import { toast, Toasts } from '@backpackapp-io/react-native-toast';

if(Platform.OS === 'android') {
  if(UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const Todo = () => {
  const [todo, setTodo] = useState([])

  const [condition, setCondition] = useState({
    isOpenTask: true,
    isOpenCompleted: false,
    loadingView: false,
    loadingTaskList: false,
    loadingCompletedList: false,
    loadingButton: false,
    currentIndex: 0
  })

  const [form, setForm] = useState({
    _id: '',
    title: '',
    desc: ''
  })

  const [modal, setModal] = useState({
    add: false,
    edit: false
  })

  const openTask = () => {
    LayoutAnimation.easeInEaseOut()
    setCondition({...condition, isOpenTask: !condition.isOpenTask})
  }

  const openCompleted = () => {
    LayoutAnimation.easeInEaseOut()
    setCondition({...condition, isOpenCompleted: !condition.isOpenCompleted})
  }

  const onRequestCloseModal = () => {
    setModal({ add: false, edit: false })
    setForm({ _id: '', title: '', desc: '' })
  }

  const onEdit = (v : {_id: string, title: string, desc: string}) => {
    setModal({ ...modal, edit: true })
    setForm({_id: v._id, title: v.title, desc: v.desc})
  }

  const onDeleteTask = (value: {_id: string, title: string, checked: boolean}, index: number) => {
    Alert.alert('Delete Task!', `Anda akan menghapus task id ${value._id} dengan title ${value.title}`, [
      { text: 'Cancel'},
      { text: 'Yakin', onPress: () => deleteTodo(value._id, value.checked, index) }
    ])
  }

  const getAllTodo = async() => {
    try {
      const result = await read('/todos')
      if(result.status !== 'success') return toast.error(result.message)

      setTodo(result.data.todos)
      return result
    } catch (error: any) {
      return toast.error(error)
    }
  }

  const addTodo = async() => {
    try {
      setCondition({...condition, loadingButton: true})

      const result = await create('/todos', form)
      await getAllTodo()
      
      result.status !== 'success' && toast.error(`Failed : ${result.message}`)
      result.status !== 'error' && toast.success('Add task successfully')

      setModal({...modal, add: false})
      setForm({_id: '', title: '', desc: ''})
      
      return result
    } catch (error: any) {
      return toast.error(error)
    } finally {
      return setCondition({...condition, loadingButton: false})
    }
  }

  const updateTodo = async() => {
    try {
      setCondition({...condition, loadingButton: true})
      
      const result = await update(`/todos/${form._id}`, form)
      await getAllTodo()

      result.status !== 'success' && toast.error(`Failed : ${result.message}`)
      result.status !== 'error' && toast.success('Task updated successfully')

      setModal({...modal, edit: false})
      setForm({_id: '', title: '', desc: ''})
      
      return result
    } catch (error) {
      
    } finally {
      return setCondition({...condition, loadingButton: false})
    }
  }

  const onCompleted = async(value: {_id: string, title: string, checked: boolean}, i: number) => {
    try {
      setCondition({...condition, currentIndex: i, loadingTaskList: !value.checked, loadingCompletedList: value.checked})
      
      const result = await update(`/todos/${value._id}`, {checked: !value.checked})
      if(result.status !== 'success') return toast.error(result.message)

      await getAllTodo()
      toast.success(`${value.title} ${value.checked ? 'uncompleted' : 'completed'}`)

      return result
    } catch (error) {
      
    } finally {
      return setCondition({...condition, loadingTaskList: false, loadingCompletedList: false})
    }
  }

  const deleteTodo = async(id: string, checked: boolean, i: number) => {
    try {
      setCondition({...condition, currentIndex: i, loadingTaskList: !checked, loadingCompletedList: checked})
      
      const result = await destroy(`/todos/${id}`)
      if(result.status !== 'success') return toast.error(result.message)

      await getAllTodo()
      toast.success(result.message)

      return result
    } catch (error: any) {
      return toast.error(error)
    } finally {
      return setCondition({...condition, loadingTaskList: false, loadingCompletedList: false})
    }
  }

  useEffect(() => {
    const getAllTodo = async() => {
      try {
        setCondition({...condition, loadingView: true})
        const result = await read('/todos')
        if(result.status !== 'success') return toast.error(result.message)
  
        setTodo(result.data.todos)
        return result
      } catch (error: any) {
        return toast.error(error)
      } finally {
        return setCondition({...condition, loadingView: false})
      }
    }

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
                <Ionicon name={condition.isOpenTask ? 'chevron-down' : 'chevron-forward'} size={14} />
              </TouchableOpacity>

              {todo.filter((v: {checked: boolean}) => !v.checked).map((v: {_id: string, title: string, desc: string, checked: boolean}, i) => condition.isOpenTask && <ListTodo key={i} title={v.title} desc={v.desc} isCompleted={v.checked} onCompleted={() => onCompleted(v, i)} isEdit={() => onEdit(v)} isLoading={condition.loadingTaskList && i === condition.currentIndex} onDelete={() => onDeleteTask(v, i)} />)}

              <TouchableOpacity onPress={openCompleted} style={{ flexDirection: 'row', padding: 5, alignItems: 'center', marginBottom: 20, width: 100 }}>
                <Text style={{ marginRight: 10 }}>Completed</Text>
                <Ionicon name={condition.isOpenCompleted ? 'chevron-down' : 'chevron-forward'} size={14} />
              </TouchableOpacity>

              {todo.filter((v: {checked: boolean}) => v.checked).map((v: {_id: string, title: string, desc: string, checked: boolean}, i) => condition.isOpenCompleted && <ListTodo key={i} title={v.title} desc={v.desc} isCompleted={v.checked} onCompleted={() => onCompleted(v, i)} isEdit={() => onEdit(v)} isLoading={condition.loadingCompletedList && i === condition.currentIndex} onDelete={() => onDeleteTask(v, i)} />)}

            </>
          ) : (
            <>
              <Image source={{ uri: 'https://i.ibb.co.com/XFKh9Jc/Checklist-rafiki-1.png' }} height={250} width={250} resizeMode='contain' style={{ alignSelf: 'center', marginTop: 75 }} />
              <Text style={{ fontSize: 18, textAlign: 'center' }}>What do you want to do today?</Text>
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Tap + to add your tasks</Text>
            </>
          )}
          <FormModal title={modal.add ? 'Add Task' : 'Detail Task'} visible={modal.add || modal.edit} taskTitle={form.title} taskDesc={form.desc} onRequestClose={onRequestCloseModal} onChangeTaskTitle={v => setForm({...form, title: v})} onChangeTaskDesc={v => setForm({...form, desc: v})} buttonTitle={modal.add ? 'Add Task' : 'Edit Task'} buttonLoading={condition.loadingButton} onPressButton={modal.add ? addTodo : updateTodo} />
        </ScrollView>
        <Toasts/>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default Todo