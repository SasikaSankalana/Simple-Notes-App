import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, Button, TouchableOpacity} from 'react-native';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import ViewNote from './components/ViewNote';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Notes">
          {props => <Notes {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Add Note"
          options={{
            headerRight: () => (
              <TouchableOpacity>
                <Text>Save</Text>
              </TouchableOpacity>
            ),
          }}>
          {props => <AddNote {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Update Note"
          options={{
            headerRight: () => (
              <TouchableOpacity>
                <Text>Save</Text>
              </TouchableOpacity>
            ),
          }}>
          {props => <AddNote {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="View Note"
          options={{
            title: null,
            headerRight: () => (
              <>
                <TouchableOpacity>
                  <Text>Update </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </>
            ),
          }}>
          {props => <ViewNote {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
