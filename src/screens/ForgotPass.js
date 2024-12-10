import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import {
    NativeBaseProvider, Box, Heading, VStack, FormControl, HStack,
    Input, Button, Link, Center, useColorModeValue, useColorMode, ScrollView
}
    from "native-base";
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const bgColor = useColorModeValue('light.background.50',
        'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const linkColor = useColorModeValue("indigo.500", "indigo.300");
    const { colorMode } = useColorMode();

    const handleLogin = () => {
        if (email && password) {
            setIsAuthenticated(true);
            navigation.navigate('MainTab');
        } else {
            alert('Please enter your credentials');
        }
    };

    return (
        <Center w="100%" bg={bgColor} flex={1}>
            <Image
                source={
                    colorMode === 'dark'
                        ? require('../../assets/SafeLab_app_dark.png')
                        : require('../../assets/SafeLab_app.png')
                }
                style={{ width: '100%', height: 350, marginBottom: 0 }}
                resizeMode="contain"
            />
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color={textColor}>
                    Restore password
                </Heading>
                <VStack space={1} mt="2">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>New password</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm new password</FormControl.Label>
                        <Input type="password" value={password} onChangeText={setPassword} />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate('Login')}>
                        Login
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default ForgotPasswordScreen;
