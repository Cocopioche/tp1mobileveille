import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//32 React route params démo

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="All tracks" component={AllTracksScreen} options={{headerTitle: (props) => <View/>}}/>
          <Stack.Screen name="Track details" component={TrackDetailsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
const AllTracksScreen = ({navigation}) => {
  return  <View>
    <Pressable style={styles.pressable} 
    onPress={() => navigation.navigate({name:"Track details", params:{trackId: 42_2, trackName: "Solaar pleure", author: "Mc Solaar"}, merge: true })}>
      <Text style={styles.pressable_text}>Solaar pleure</Text>
    </Pressable>
    <Pressable  style={styles.pressable} 
    onPress={() => navigation.navigate("Track details", {trackId: 120, trackName: "Caroline", author: "Mc Solaar"})}>
      <Text style={styles.pressable_text}>Caroline</Text>
    </Pressable>
  </View>
}
const TrackDetailsScreen = ({navigation, route}) => {
  const {trackId, trackName, author} = route.params
  return  <View>
    <Text>Track details screen</Text>
    <Text>Track name: {trackId}</Text>
    <Text>Track name: {trackName}</Text>
    <Text>Track author: {author}</Text>
  </View>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable:{
    borderWidth:1,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#abf',
  },
  pressable_text:{
    fontSize:15,

    alignItems: 'center',
  }

});
