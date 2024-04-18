import React, { useState, useEffect, createContext, useContext } from 'react';
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

const UserContext = createContext();

const checkCredentials = (username, password) => {
    const credentials = {"User":"password","Bob":"test","Test":"test"}
    return credentials[username] === password;
};

function CameraScreen() {
    const { username } = useContext(UserContext);
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
            <Text>{username}</Text>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="Grant Permission" />
        </View>
    );
}

function AudioScreen() {
    const { username } = useContext(UserContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{username}</Text>
            <Text>Audio Screen</Text>
        </View>
    );
}

const ProfileScreen = ({ route }) => {
    const { personName } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome, {personName}!</Text>
            {capturedImageUri && (
                <Image
                    source={{ uri: capturedImageUri }}
                    style={{ width: 200, height: 200, marginTop: 20 }}
                />
            )}
            {audioFilePath && (
                <Pressable onPress={playAudio} style={{ marginTop: 20 }}>
                    <Text>Play Audio</Text>
                </Pressable>
            )}
        </View>
    );
};


function HomeScreen({ navigation }) {
    const { setUsername: setUserContextUsername } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (checkCredentials(username, password)) {
            setUserContextUsername(username); // Update the username in context
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
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={{ username, setUsername }}>
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
                        initialParams={ {personName: username } }
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
        </UserContext.Provider>
    );
};

export default App;
