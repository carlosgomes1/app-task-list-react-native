import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList/'
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTaks] = useState([

    { key:1, task: "Ed lindo" },
    { key:2, task: "Ed gatao" },
    { key:3, task: "Ed foda mane" },
    { key:4, task: "Caco feioso" },
    { key:5, task: "ae ed xera pal" },

  ]);

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
        renderItem={({ item }) => <TaskList data={item} /> }
      />

      <AnimatedBtn 
      style={ styles.fab }
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
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
  }
});