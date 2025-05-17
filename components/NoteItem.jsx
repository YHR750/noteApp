import React, { useState, useRef } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native'

const NoteItem = ({note, onDelete, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);
  const handleSave = () => {
    if(editedText.trim() === '')return;
    onEdit(note.id, editedText);
    setIsEditing(false)

  };
  return (
    <View style={styles.noteItem}>
        {isEditing?
          (
            <TextInput
              ref = {inputRef}
              style ={styles.input}
              value = {editedText}
              onChangeText={setEditedText}
              autoFocus
              onSubmitEditing={handleSave}
              returnKeyType='done'
            />
          ):
          (
            <Text style={styles.noteText}>{note.text}</Text>
          )
        }
        
        <View style={styles.actions}>
          {isEditing?
            (
              <TouchableOpacity onPress={() => {
                handleSave();
                inputRef.current?.blur();
              }}>
                <Text style={styles.edit}>💾</Text>
              </TouchableOpacity>
            ):
            (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={styles.edit}>✏️</Text>
              </TouchableOpacity>
            )
          }
          <TouchableOpacity onPress={() => onDelete(note.id)}>
            <Text style={styles.delete}>❌</Text>
          </TouchableOpacity>
        </View>
        
    </View>
  )
}

export default NoteItem
const styles = StyleSheet.create({
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    noteText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5555',
        marginTop: 15,
    },
    delete: {
      fontSize: 18,
      color: "red",
    },
    edit: {
      fontSize: 18,
      marginRight: 10,
    },
    actions: {
      flexDirection: "row",
    }
    });