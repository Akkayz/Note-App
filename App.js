import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [mainText, setMainText] = useState('Nguyễn Hưng 2124801030027');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('courseGoals');
        if (storedGoals) {
          setCourseGoals(JSON.parse(storedGoals));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchGoals();
  }, []);

  const saveGoals = async (goals) => {
    try {
      await AsyncStorage.setItem('courseGoals', JSON.stringify(goals));
    } catch (e) {
      console.error(e);
    }
  };

  const addGoalHandler = (goal) => {
    let updatedGoals;
    if (selectedGoal) {
      updatedGoals = courseGoals.map(g => g.id === selectedGoal.id ? { ...g, value: goal.title, note: goal.note } : g);
      setSelectedGoal(null);
    } else {
      updatedGoals = [...courseGoals, { id: Math.random().toString(), value: goal.title, note: goal.note }];
    }
    setCourseGoals(updatedGoals);
    saveGoals(updatedGoals);
    setIsModalVisible(false);
  };

  const removeGoalHandler = (goalId) => {
    const updatedGoals = courseGoals.filter((goal) => goal.id !== goalId);
    setCourseGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  const editGoalHandler = (goalId) => {
    const goal = courseGoals.find(g => g.id === goalId);
    setSelectedGoal(goal);
    setIsModalVisible(true);
  };

  return (
    <MenuProvider>
      <View style={styles.screen}>
        <Text style={styles.mainText}>{mainText}</Text>
        <FlatList 
          data={courseGoals}
          renderItem={itemData => (
            <GoalItem 
              id={itemData.item.id}
              title={itemData.item.value}
              note={itemData.item.note}
              onDelete={removeGoalHandler}
              onEdit={editGoalHandler}
            />
          )}
        />
        <Pressable style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          <Icon name="add" size={30} color="white" />
        </Pressable>
        <GoalInput 
          visible={isModalVisible} 
          onAddGoal={addGoalHandler} 
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedGoal(null);
          }}
          goal={selectedGoal}
        />
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 30,
  },
  mainText: {
    fontSize: 20,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#2196F3',
    borderRadius: 50,
    padding: 15,
  },
});