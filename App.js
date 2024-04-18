import { View, Text, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';

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
            <Text>Home Screen</Text>
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
                <Text>Login</Text>
            </Pressable>
            <Text>Co-équipiers: John, Jane, Alex</Text>
        </View>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Camera" component={CameraScreen} />
                <Tab.Screen name="Audio" component={AudioScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;

