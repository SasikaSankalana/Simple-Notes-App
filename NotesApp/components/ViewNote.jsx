import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';

const ViewNote = ({route, navigation}) => {
  console.log(route.params);
  const {noteId} = route.params;
  // const [title, setTitle] = useState('');
  // const [content, setContent] = useState('');

  const [data, setData] = useState([]);

  const loadNote = async () => {
    console.log({noteId});
    try {
      const response = await fetch(
        'http://10.10.7.202:8080/api/notes/' + noteId,
      );
      console.log(response);
      const json = await response.json();
      setData(json);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNote();
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity onPress={onUpdate}>
            <Text>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text>Delete </Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);

  const onUpdate = () => {
    console.log(data);
    navigation.navigate('Update Note', data);
  };

  const onDelete = () => {
    console.log('Delete');
  };

  return (
    <ScrollView>
      <View style={{padding: 20, justifyContent: 'space-around'}}>
        <Text>{data.title}</Text>
        <Text>{data.created}</Text>
        <Text>{data.content}</Text>
      </View>
    </ScrollView>
  );
};

export default ViewNote;
