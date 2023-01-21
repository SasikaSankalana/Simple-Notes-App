import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';

const AddNote = ({route, navigation}) => {
  console.log(route.params);
  const noteId = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSave}>
          <Text>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleTextChange = (text, field) => {
    if (field === 'title') setTitle(text);
    if (field === 'content') setContent(text);
  };

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: 'testing',
      content: 'testing',
      created: Date.now(),
      modified: Date.now(),
    }),
  };

  const onSave = async () => {
    try {
      const response = await fetch(
        'http://10.10.7.202:8080/api/notes',
        requestOptions,
      );
      const json = await response.json();
      return;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 20, justifyContent: 'space-around'}}>
            <TextInput
              value={title}
              onChangeText={text => handleOnChangeText(text, 'title')}
              placeholder="here"></TextInput>
            <TextInput
              value={content}
              onChangeText={text => handleOnChangeText(text, 'content')}
              placeholder="here"
              multiline={true}></TextInput>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddNote;
