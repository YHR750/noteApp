import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'


const NoteItem = ({note}) => {
  return (
    <View style={styles.noteItem}>
        <Text style={styles.noteText}>{note.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={styles.edit}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
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