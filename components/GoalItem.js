import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';

const GoalItem = ({ id, title, note, onDelete, onEdit }) => {
  return (
    <View style={styles.goalItem}>
      <Menu>
        <MenuTrigger>
          <View style={styles.menuTrigger}>
            <Text style={styles.goalTitle}>{title}</Text>
            <Text style={styles.goalNote}>{note}</Text>
          </View>
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
          <MenuOption onSelect={() => onEdit(id)}>
            <View style={styles.menuOption}>
              <Icon name="create-outline" size={20} color="#000" />
              <Text style={styles.menuOptionText}>Chỉnh sửa</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => onDelete(id)}>
            <View style={styles.menuOption}>
              <Icon name="trash-outline" size={20} color="#000" />
              <Text style={styles.menuOptionText}>Xoá</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  menuTrigger: {
    flexDirection: 'column',
  },
  goalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  goalNote: {
    fontSize: 15,
    marginTop: 5,
  },
  menuOptions: {
    marginTop: 20,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuOptionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default GoalItem;