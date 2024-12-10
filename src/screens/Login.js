import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import {
    Box, Heading, VStack, FormControl,
    Input, Button, Link, Center, useColorModeValue, useColorMode
} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";

const LoginScreen = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("indigo.500", "indigo.300");
    const { colorMode } = useColorMode();

    const handleLogin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                setIsAuthenticated(true);
                navigation.navigate('MainTab');
            } catch (error) {
                alert(`Login failed: ${error.message}`);
            }
        } else {
            alert('Please enter your email and password');
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
                        Sign in to continue!
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
                        <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
                            Login
                        </Button>
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: linkColor
                        }} alignSelf="center" mt="2" onPress={() => navigation.navigate('ForgotPassword')}>
                            Forgot Password?
                        </Link>
                        <VStack mt="2" justifyContent="center">
                            <Heading mt="2" color={textColor} fontWeight="medium" size="xs" alignSelf='center'>
                                I'm a new user!
                            </Heading>
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: linkColor
                            }} alignSelf="center" mt="2" onPress={() => navigation.navigate('Register')}>
                                Register
                            </Link>
                        </VStack>
                    </VStack>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
