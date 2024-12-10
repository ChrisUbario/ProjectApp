import React from 'react';
import { Dimensions } from 'react-native';
import { Center, Box, Text, Button, VStack, useColorModeValue, Avatar, Icon, Row, ScrollView } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation, route }) => {
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const { name, email, phone, avatar } = route.params || {};

    return (
        <ScrollView flex={1} bg={bgColor}>
            <Center >
                <Box
                    bg="primary.400"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height={screenHeight * 0.45}
                    zIndex={1}
                    justifyContent="flex-end"
                    py={4}
                    px={4}
                >
                    {/* Contenido Interno */}
                    <VStack justifyContent="center" alignItems="center" space={4}>
                        <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color="white"
                            textAlign="center"
                            letterSpacing={6}
                        >
                            Profile
                        </Text>
                        <Avatar
                            bg="purple.600"
                            size="2xl"
                            source={avatar ? { uri: avatar } : null}
                        >
                            RB
                        </Avatar>
                        <Box
                            bg="black"
                            width="40%"
                            p={4}
                            borderRadius={10}
                            borderColor="coolGray.400"
                            justifyContent="center"
                            alignItems="center"
                            height='23%'
                        >
                            <Text
                                fontSize="2xl"
                                fontWeight="bold"
                                color="white"
                                letterSpacing={2}
                                textAlign="center"
                            >
                                {name}
                            </Text>
                        </Box>
                    </VStack>
                </Box>

                {/* Profile Summary */}
                <Box
                    bg={bgColor}
                    width={screenWidth * 0.8}
                    p={4}
                    borderRadius={10}
                    borderColor="coolGray.400"
                    justifyContent="center"
                    alignItems="center"
                    mt={screenHeight * 0.48}
                    zIndex={0}
                >
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={textColor}
                        letterSpacing={2}
                        textAlign="center"
                    >
                        Profile Summary
                    </Text>
                </Box>

                {/* Detalles del Perfil */}
                <VStack space={4} width="90%" mt={4}>
                    <VStack space={3} width="100%">
                        <Row space={3} alignItems="center">
                            <Icon as={Ionicons} name="person" size="lg" color="primary.500" />
                            <Text fontSize="md" color={textColor}>Name: {name}</Text>
                        </Row>

                        <Row space={3} alignItems="center">
                            <Icon as={Ionicons} name="mail" size="lg" color="primary.500" />
                            <Text fontSize="md" color={textColor}>Email: {email}</Text>
                        </Row>

                        <Row space={3} alignItems="center">
                            <Icon as={Ionicons} name="call" size="lg" color="primary.500" />
                            <Text fontSize="md" color={textColor}>Phone: {phone}</Text>
                        </Row>
                    </VStack>

                    {/* Botón de Guardar */}
                    <Button
                        mt="5"
                        mb={5}
                        colorScheme="primary"
                        width={screenWidth * 0.4}
                        alignSelf="center"
                        onPress={() => navigation.navigate('ProfileSummary')}
                    >
                        Edit
                    </Button>
                </VStack>
            </Center >
        </ScrollView>
    );
};

export default ProfileScreen;
