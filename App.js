import { View, Text, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function CameraScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera Screen</Text>
        </View>
    );
}

function AudioScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Audio Screen</Text>
        </View>
    );
}

function ProfileScreen({ route }) {
    const { personName } = route.params || {};
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
            {personName && <Text>Logged in as: {personName}</Text>}
        </View>
    );
}

function HomeScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Authenticate user and navigate to ProfileScreen with personName
        navigation.navigate('Profile', { personName: username });
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Accueil</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable onPress={handleLogin}>
                <Text>Connexion</Text>
            </Pressable>
            <Text>Co-équipiers: Noah Gendron, Jean-Christophe Rochon</Text>
        </View>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Accueil" component={HomeScreen}
                            options={{tabBarIcon:()=><Ionicons name="home" size={24} color="black" />}}/>

                <Tab.Screen name="Profile" component={ProfileScreen}
                            options={{tabBarIcon:()=><Ionicons name="people" size={24} color="black" />}}/>

                <Tab.Screen name="Camera" component={CameraScreen}
                            options={{tabBarIcon:()=><Ionicons name="camera" size={24} color="black" />}}/>

                <Tab.Screen name="Audio" component={AudioScreen}
                            options={{tabBarIcon:()=><Ionicons name="headset" size={24} color="black" />}}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;

