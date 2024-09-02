import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = ({ visible, onAddGoal, onCancel, goal }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredNote, setEnteredNote] = useState('');

  useEffect(() => {
    if (goal) {
      setEnteredTitle(goal.value);
      setEnteredNote(goal.note);
    } else {
      setEnteredTitle('');
      setEnteredNote('');
    }
  }, [goal]);

  useEffect(() => {
    if (!goal && visible) {
      setEnteredTitle('');
      setEnteredNote('');
    }
  }, [visible]);

  const titleInputHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const noteInputHandler = (enteredText) => {
    setEnteredNote(enteredText);
  };

  const addGoalHandler = () => {
    onAddGoal({ title: enteredTitle, note: enteredNote });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Tiêu đề" 
          style={[styles.input, styles.titleInput]} 
          onChangeText={titleInputHandler}
          value={enteredTitle}
        />
        <TextInput           
          placeholder="Ghi chú"
          style={[styles.input, styles.noteInput]}
          onChangeText={noteInputHandler}
          value={enteredNote}
          multiline
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Hủy" color="red" onPress={onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="Thêm" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  noteInput: {
    fontSize: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '40%',
  },
});

export default GoalInput;