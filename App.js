import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, 
  TextInput, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList/'
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [ task, setTask ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ input, setInput ] = useState('');

  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();

  }, []);

  useEffect(() => {

    async function saveTask() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTask();

  }, [task]);

  function addTask() {
    if( input === '' ) {
      return
    }

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false)
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })

  return(
    <SafeAreaView style={ styles.container }>

      <StatusBar
        backgroundColor="#171D31"
        barStyle="light-content"
      />

      <View style={ styles.content }>
        <Text style={ styles.title }> Minhas tarefas </Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={ false }
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={ handleDelete } /> }
      />

      <Modal animationType="slide" transparent={ false } visible={ open }>

        <SafeAreaView style={ styles.modal }>

          <View style={ styles.modalHeader } >
            <TouchableOpacity onPress={ () => setOpen(false) } >
              <Ionicons style={{ marginLeft: 5, marginRight: 5, }} name="md-arrow-back" size={ 40 } color="#FFF"/>
            </TouchableOpacity>
            <Text style={ styles.modalTitle }> Nova tarefa </Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="Digite uma nova tarefa..."
              style={ styles.input }
              value={input}
              onChangeText={ (text) => setInput(text) } 
            />

            <TouchableOpacity style={ styles.btnCadastrar } onPress={ addTask }>
              <Text style={ styles.textBtnCadastrar } > Cadastrar </Text>
            </TouchableOpacity>

          </Animatable.View>

        </SafeAreaView>

      </Modal>

      <AnimatedBtn 
      style={ styles.fab }
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={ () => setOpen(true) }
      >
        <Ionicons
          name="ios-add"
          size={35}
          color="#FFF"
        />
      </AnimatedBtn>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171D31',
  },

  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },

  modal: {
    flex: 1,
    backgroundColor: '#171D31',
  },

  modalHeader: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 30,
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  modalBody: {
    marginTop: 15,
  },  

  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    height: 120,
    backgroundColor: '#FFF',
    padding: 9,
    color: "#000",
    borderRadius: 10,
    textAlignVertical: 'top',
  },

  btnCadastrar: {
    backgroundColor: '#FFF',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    width: '94%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  textBtnCadastrar: {
    fontSize: 20,
  }

});