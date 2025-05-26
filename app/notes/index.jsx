import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { useState, useEffect } from "react";
import NoteList from "@/components/NoteList";
import AddNoteModal from "../../components/AddNoteModal";

const NoteScreen = () => {
    const [notes, setNotes] = useState([
        {id:'1',text:'Note One'},
        {id:'2',text:'Note Two'},
        {id:'3',text:'Note Three'},
    ]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pressCount, setPressCount] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState('');
    const addNote = async () => {
        //if (newNote.trim()==='')return;
        //setNotes((prevNote) => [
            //...prevNote,
            //{id:Date.now.toString(),text:newNote},
        //]);
        const today = new Date().toISOString().split("T")[0];
        console.log(newNote);
        let text = newNote;
        let lastEdit = today;
        try{
            const response = await fetch (`http://127.0.0.1:3000/addNote`,{
                method: 'POST', 
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({text,lastEdit}),
            });
            //setItems([...items, response.]);
            setPressCount(prev => prev + 1);
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
    },[pressCount ]);
    
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
    const updateData = async(id,text) => {
        const lastEdit = new Date().toISOString().split("T")[0];
        console.log(lastEdit)
        //console.log(onEdit);
        try{
            const response = await fetch (`http://127.0.0.1:3000/changeData`,{
                method : 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text,lastEdit,id}),
            });
            if (!response.ok) {
                throw new Error(`Server error : ${response.status}`);
            }
            const data = await response.json();
            setItems((prevItems) => prevItems.map((item) => item.id === id ? {...item, text: text} : item));

        }catch(err){
            setError(err.message);
            console.error("Update failed", err)
        }
    };
    

    return(
        //mengatur yg dilihat
        <View style={styles.container}>
            <NoteList notes={items} onDelete = {deleteNote} onEdit = {updateData}/>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Noted</Text>
            </TouchableOpacity>
            <AddNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />

    

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