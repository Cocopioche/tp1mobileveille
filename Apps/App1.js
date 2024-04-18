
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//App1

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return <View>
    <View><Text>Home</Text></View>
    <Button title="À Propos" onPress={() => navigation.navigate("APropos")}/>
  </View>
}

const AboutScreen = () =>  <Text>À Propos</Text>

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="APropos" component={AboutScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}