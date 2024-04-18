
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//App1.2 options

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return <View>
    <View><Text>Home</Text></View>
    <Button title="À Propos" onPress={() => navigation.navigate("À_Propos")}/>
    <Button title="Nos produits" onPress={() => navigation.navigate("Produits")}/>
  </View>
}

const AboutScreen = () =>  <Text>À Propos</Text>
const ProductsScreen = () => <View><Text>produit 1</Text><Text>produit 2</Text></View>

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="À_Propos" component={AboutScreen}/>
          <Stack.Screen name="Produits" component={ProductsScreen} options={{title:'Nos Produits', }}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
}