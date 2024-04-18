import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    teammates: {
        marginTop: 10,
        fontSize: 14,
        color: '#777',
    },
});

const Tab = createBottomTabNavigator();

const checkCredentials = (username, password) => {
    return username === 'User' && password === 'password';
};

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

function ProfileScreen() {
    const { personName } = route.params || {};
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.heading}>Profil</Text>
            {personName && <Text style={styles.username}>Connecté en tant que: {personName}</Text>}
            <View style={styles.profileContainer}>
                {}
            </View>
        </View>
    );
}

function HomeScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (checkCredentials(username, password)) {
            navigation.navigate('Profile');
        } else {
            Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Connexion</Text>
            </Pressable>
            <Text style={styles.teammates}>Co-équipiers:</Text>
            <Text style={styles.teammates}>Noah Gendron</Text>
            <Text style={styles.teammates}>Jean-Christophe Rochon</Text>
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
