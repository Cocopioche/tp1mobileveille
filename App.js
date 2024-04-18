import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

const Tab = createBottomTabNavigator();

function CameraScreen() {
    const [permission, setPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    const requestPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === 'granted');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="Grant Permission" />
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
                <Tab.Screen
                    name="Accueil"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons name="home" size={24} color="black" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons name="people" size={24} color="black" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons name="camera" size={24} color="black" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Audio"
                    component={AudioScreen}
                    options={{
                        tabBarIcon: () => (
                            <Ionicons name="headset" size={24} color="black" />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;