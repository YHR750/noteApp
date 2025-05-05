import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { useState, useEffect } from "react";
import NoteList from "@/components/NoteList";

const NoteScreen = () => {
    const [notes, setNotes] = useState([
        {id:'1',text:'Note One'},
        {id:'2',text:'Note Two'},
        {id:'3',text:'Note Three'},
    ]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const addNote = async () => {
        //if (newNote.trim()==='')return;
        //setNotes((prevNote) => [
            //...prevNote,
            //{id:Date.now.toString(),text:newNote},
        //]);
        const today = new Date().toISOString().split("T")[0];
        try{
            const response = await fetch (`http://127.0.0.1:3000/addNote`,{
                method: 'POST', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({newNote,today}),
            });
        }catch(error){
            console.log(error)
        }
        setNewNote('');
        setModalVisible(false);
    }
    useEffect(() => {
        const fetchNote = async () => {
            try{
                const response = await fetch (`http://127.0.0.1:3000/showAllNotes`);
                const data = await response.json();
                setItems(data.values);
            }
            catch(err){
                setError(err.message);
            }
        };
        fetchNote();
        console.log(items)
    },[]);
    
    const deleteNote = async(id) => {
        try{
            console.log("id"+id);
            const response = await fetch (`http://127.0.0.1:3000/deleteData/${id}`,{
                method : 'DELETE',

            });
            if (!response.ok) {
                throw new Error(`Server error : ${response.status}`);
            }
            const data = await response.json();
            setItems((prevItems) => prevItems.filter((items) => items.id !== id));
        }catch(err){
            setError(err.message);
            console.error("Delete failed:", err)
        }
    };

    return(
        //mengatur yg dilihat
        <View style={styles.container}>
            <NoteList notes={items} onDelete = {deleteNote}/>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Noted</Text>
            </TouchableOpacity>

        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default NoteScreen;