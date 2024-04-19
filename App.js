import React, { useState, useEffect,  createContext, useContext, useRef } from 'react';
import { View, Text, TextInput, Pressable, TouchableOpacity, Image, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraType } from 'expo-camera';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system'; // Import FileSystem from expo-file-system


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


    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    audioInfo: {
        marginVertical: 10,
    },
    audioButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    audioButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 20,
    },
});

const Tab = createBottomTabNavigator();

const UserContext = createContext();

const checkCredentials = (username, password) => {
    const credentials = {"User":"password","Bob":"test","Test":"test"}
    return credentials[username] === password;
};

const CameraScreen = () => {
    const [permission, setPermission] = useState(null);
    const [showCamera, setShowCamera] = useState(false); // Initialize showCamera to false
    const [type, setType] = useState(Camera.Constants.Type.back); // Import CameraType from expo-camera
    const cameraRef = useRef(null);
    const { setCapturedImageUri } = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === 'granted');
        })();
    }, []);

    function toggleCameraType() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            const uri = `${FileSystem.documentDirectory}photo.jpg`;
            await FileSystem.moveAsync({ from: photo.uri, to: uri });
            setCapturedImageUri(uri);
        }
    }

    if (permission === null) {
        return <View><Text>Requesting camera permission...</Text></View>;
    }

    if (permission === false) {
        return <View><Text>No access to camera</Text></View>;
    }

    return (
        <View style={{ flex: 1 }}>
            {showCamera ? ( // Only render the camera if showCamera is true
                <Camera style={{ flex: 1 }} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.camButton} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.camButton} onPress={takePicture}>
                            <Text style={styles.text}>Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            ) : (
                <Button onPress={() => setShowCamera(true)} title="Open Camera" />
            )}
        </View>
    );
};
const AudioScreen = () => {
    const [recording, setRecording] = useState();
    const [audioUri, setAudioUri] = useState(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const { setAudioFilePath } = useContext(UserContext);

    useEffect(() => {
        if (audioUri) {
            // Load the audio for playback
            const soundObject = new Audio.Sound();
            const loadAudio = async () => {
                try {
                    await soundObject.loadAsync({ uri: audioUri });
                } catch (error) {
                    console.error('Failed to load audio', error);
                }
            };

            loadAudio();

            return () => {
                soundObject.unloadAsync();
            };
        }
    }, [audioUri]);

    async function startRecording() {
        try {
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setAudioUri(uri); // Store the URI of the recorded audio
        setAudioFilePath(uri) // Update audio file path in the context
        console.log('Recording stopped and stored at', uri);
    }

    async function playAudio() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri: audioUri });
            await soundObject.playAsync();
        } catch (error) {
            console.error('Failed to play audio', error);
        }
    }

    return (
        <View style={styles.container}>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            {audioUri && (
                <>
                    <Text style={styles.audioInfo}>Recording saved at: {audioUri}</Text>
                    <Button title="Play Recording" onPress={playAudio} />
                </>
            )}
        </View>
    );
}



const ProfileScreen = ({route}) => {
    const { username, audioFilePath, capturedImageUri } = useContext(UserContext);

    const playAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri: audioFilePath }); // Charger l'audio à partir de l'URI
            await soundObject.playAsync(); // Lire l'audio
        } catch (error) {
            console.error('Failed to play audio', error);
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bonjour, {username}!</Text>
            <Text>! {capturedImageUri} !</Text>

            {audioFilePath && (
                <TouchableOpacity onPress={playAudio} style={styles.audioButton}>
                    <Text style={styles.audioButtonText}>Play Audio</Text>
                </TouchableOpacity>

            )}
            {capturedImageUri ? (
                <Image
                    style={styles.image}
                    source={{ uri: capturedImageUri }}
                />
            ) : (
                <Image
                    style={styles.image}
                    source={{
                        uri: "./default.jpg",
                    }}
                />
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
            setUserContextUsername(username);
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
    const [audioFilePath, setAudioFilePath] = useState('');
    const [capturedImageUri, setcapturedImageUri] = useState('./default.jpg');

    return (
        <UserContext.Provider value={{ username, setUsername, audioFilePath, setAudioFilePath, capturedImageUri, setcapturedImageUri }}>
            <NavigationContainer>
                <Tab.Navigator>
                    {!username ? (
                        <Tab.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ tabBarVisible: false }}
                        />
                    ) : (
                        <>
                            <Tab.Screen
                                name="Accueil"
                                component={HomeScreen}
                                options={{
                                    tabBarIcon: () => (
                                        <Ionicons name="home" size={24} color="black" />
                                    ),
                                    title: username ? username : 'Accueil',
                                    tabBarLabel : 'Accueil',
                                }}
                            />
                            <Tab.Screen
                                name="Profile"
                                component={ProfileScreen}
                                initialParams={{ personName: username, capturedImageUri: "./default.jpg", audioFilePath: "" }}
                                options={{
                                    tabBarIcon: () => (
                                        <Ionicons name="people" size={24} color="black" />
                                    ),
                                    title: username ? username : 'Profile',
                                    tabBarLabel : 'Profile',
                                }}
                            />
                            <Tab.Screen
                                name="Camera"
                                component={CameraScreen}
                                options={{
                                    tabBarIcon: () => (
                                        <Ionicons name="camera" size={24} color="black" />
                                    ),
                                    title: username ? username : 'Camera',
                                    tabBarLabel : 'Camera',
                                }}
                            />
                            <Tab.Screen
                                name="Audio"
                                component={AudioScreen}
                                options={{
                                    tabBarIcon: () => (
                                        <Ionicons name="headset" size={24} color="black" />
                                    ),
                                    title: username ? username : 'Audio',
                                    tabBarLabel : 'Audio',
                                }}
                            />
                        </>
                    )}
                </Tab.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
};

export default App;