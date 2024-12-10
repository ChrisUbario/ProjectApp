import React, { useState } from 'react';
import { Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import {
    NativeBaseProvider, Box, Heading, VStack, FormControl, HStack,
    Input, Button, Link, Center, useColorModeValue, useColorMode
}
    from "native-base";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";

const LoginScreen = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("indigo.500", "indigo.300");
    const { colorMode } = useColorMode();

    const handleRegister = async () => {
        if (password === confirmPassword) {
            try {
                // Registra al usuario con Firebase
                await createUserWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
                navigation.navigate('MainTab');
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <Center w="100%" bg={bgColor} flex={1}>
                <Image
                    source={
                        colorMode === 'dark'
                            ? require('../../assets/SafeLab_app_dark.png')
                            : require('../../assets/SafeLab_app.png')
                    }
                    style={{ width: '100%', height: "35%", marginBottom: 0 }}
                    resizeMode="contain"
                />
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color={textColor}>
                        Welcome
                    </Heading>
                    <Heading mt="2" color={textColor} fontWeight="medium" size="xs">
                        Register to continue!
                    </Heading>

                    <VStack space={1} mt="2">
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input value={email} onChangeText={setEmail} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" value={password} onChangeText={setPassword} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input type="password" value={confirmPassword} onChangeText={setConfirmPassword} />
                        </FormControl>
                        <Button mt="3" colorScheme="indigo" onPress={handleRegister}>
                            Register
                        </Button>
                        <VStack mt="2" justifyContent="center">
                            <Heading mt="2" color={textColor} fontWeight="medium" size="xs" alignSelf='center'>
                                Already have an account?
                            </Heading>
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: linkColor
                            }} alignSelf="center" mt="2" onPress={() => navigation.navigate('Login')}>
                                Login
                            </Link>
                        </VStack>
                    </VStack>
                </Box>
            </Center>
        </KeyboardAvoidingView >
    );
};

export default LoginScreen;
