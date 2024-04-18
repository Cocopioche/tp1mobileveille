import * as React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//31 React route params démo
function HomeScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button  title="Écrire un message"  onPress={() => navigation.navigate('CreatePost')}  />
      <Text>Post: {route.params?.post}</Text>
    </View> );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');
  return (
    <View>
      <TextInput multiline placeholder="votre message :)"
        style={{ height: 200, padding: 10, backgroundColor: 'pink' }}
        value={postText} onChangeText={setPostText}   />
      
      <Button  title="Done" onPress={() => { 
        // Passer et merger params pour retourner à home screen
          navigation.navigate({name: 'Home', params: { post: postText }, merge: true });
        }} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}