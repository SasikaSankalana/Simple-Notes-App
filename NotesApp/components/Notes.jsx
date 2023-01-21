import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

const Notes = ({navigation}) => {
  const [data, setData] = useState([]);
  const loadNotes = async () => {
    try {
      const response = await fetch('http://10.10.7.202:8080/api/notes');
      const json = await response.json();
      setData(json);
      return;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <View style={styles.notesContainer}>
      <View style={[StyleSheet.absoluteFillObject, styles.emptyNotesContainer]}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('View Note', {noteId: item.id})}
            style={styles.noteField}>
            <Text>{item.title}</Text>
            <Text>{item.created}</Text>
          </TouchableOpacity>
        ))}

        {/* <Text style={styles.emptyContainer}>Add Notes</Text> */}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Note')}
        style={styles.addBtn}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  notesContainer: {
    opacity: 0.9,
    backgroundColor: 'grey',
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },

  addBtn: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 35,
    right: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 50,
    elevation: 5,
  },

  emptyContainer: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },

  emptyNotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },

  noteField: {
    // flex: 1,
    backgroundColor: 'grey',
    height: 50,
    margin: 5,
  },
});

export default Notes;
