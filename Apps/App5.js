import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//App 4
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} 
           options={{tabBarIcon:()=><Ionicons name="home" size={24} color="black" />}}/>
          <Tab.Screen name="Search" component={SearchScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}
const HomeScreen = ({navigation}) =>  <View><Text>Home screen</Text></View>
const SearchScreen = () => <View><Text>Search screen</Text></View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
