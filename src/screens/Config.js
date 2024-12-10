import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import {
    VStack, Box, Text, HStack, Icon, Pressable,
    useColorModeValue, ScrollView, useColorMode,
    Modal, Button, IconButton, Switch, useToast
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfigurationScreen = ({ navigation }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(null);

    const showModal = (modal) => setModalVisible(modal);
    const closeModal = () => setModalVisible(null);

    const [isEnabled, setIsEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const toast = useToast();

    const toggleMainNotification = () => {
        setIsEnabled(!isEnabled);
        toast.show({
            description: `Notifications ${!isEnabled ? 'enabled' : 'disenabled'}`,
            bg: !isEnabled ? "teal.500" : "red.500",
            duration: 2000,
        });

        if (isEnabled) {
            setEmailNotifications(false);
        }
    };

    return (
        <ScrollView flex={1} bg={bgColor}>
            <VStack flex={1} bg={bgColor}>
                <Box
                    bg="primary.400"
                    height={screenHeight * 0.2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        letterSpacing={4}
                    >
                        Configuration
                    </Text>
                </Box>

                <VStack space={4} px={4} mt={8} mb={8}>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius="lg"
                        shadow={1}
                    >
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('appearance')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="color-palette-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Appearance
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('datetime')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="time-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Datetime
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('notifications')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="notifications-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Notifications
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('language')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="globe-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Language
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                    </Box>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius="lg"
                        shadow={1}
                    >
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('exportReports')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="download-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Export reports
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('exportData')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="cloud-download-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Export data
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                    </Box>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius="lg"
                        shadow={1}
                    >
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="star-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Rate App
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('tutorials')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="document-text-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Tutorials
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('share')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="share-social-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Share
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('about')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="chatbubble-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        About
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                    </Box>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius="lg"
                        shadow={1}
                    >
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('contact')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="send-outline"
                                        size="lg"
                                        color="blue.600"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Contact
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                    </Box>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius="lg"
                        shadow={1}
                    >
                        <Pressable
                            _pressed={{ bg: "coolGray.100" }}
                            onPress={() => showModal('logout')}
                        >
                            <HStack
                                alignItems="center"
                                justifyContent="space-between"
                                px={4}
                                py={3}
                                borderColor="coolGray.300"
                            >
                                <HStack space={3} alignItems="center">
                                    <Icon
                                        as={Ionicons}
                                        name="log-out-outline"
                                        size="lg"
                                        color="danger.300"
                                    />
                                    <Text fontSize="md" color={textColor}>
                                        Logout
                                    </Text>
                                </HStack>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size="lg"
                                    color="coolGray.400"
                                />
                            </HStack>
                        </Pressable>
                    </Box>
                </VStack>
            </VStack>
            {/* Modales para cada acción */}
            <Modal isOpen={modalVisible === 'appearance'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Appearance</Modal.Header>
                    <Modal.Body>
                        <HStack space={2} alignItems='center' alignSelf='center'>
                            <Text color={textColor} fontSize='md'>Dark</Text>
                            <Switch
                                isChecked={colorMode === "light"}
                                onToggle={toggleColorMode}
                                aria-label={
                                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                                }></Switch>
                            <Text color={textColor} fontSize='md'>Light</Text>
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'datetime'} onClose={closeModal}>
                <Modal.Content >
                    <Modal.Header alignSelf='center'>Datetime</Modal.Header>
                    <Modal.Body>
                        <Button.Group>
                            <Button>24-hr Format</Button>
                            <Button>12-hr Format</Button>
                        </Button.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'notifications'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Notifications</Modal.Header>
                    <Modal.Body>
                        <VStack space={4} width="100%">
                            <HStack space={3} alignItems="center">
                                <Text fontSize="md" color={textColor}>Active Notifications</Text>
                                <Switch
                                    isChecked={isEnabled}
                                    onToggle={toggleMainNotification}
                                    colorScheme="teal"
                                />
                            </HStack>

                            <HStack alignItems="center" space={2}>
                                <Icon
                                    as={Ionicons}
                                    name={isEnabled ? "notifications" : "notifications-off"}
                                    size="md"
                                    color={isEnabled ? "teal.500" : "gray.400"}
                                />
                                <Text fontSize="md" color={textColor}>
                                    State: {isEnabled ? "Enabled" : "Disenabled"}
                                </Text>
                            </HStack>

                            {isEnabled && (
                                <VStack space={3} mt={4}>
                                    <HStack space={3} alignItems="center">
                                        <Text fontSize="md" color={textColor}>Notifications by Email</Text>
                                        <Switch
                                            isChecked={emailNotifications}
                                            onToggle={() => setEmailNotifications(!emailNotifications)}
                                            colorScheme="blue"
                                        />
                                    </HStack>
                                </VStack>
                            )}
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'language'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Language</Modal.Header>
                    <Modal.Body>
                        <Button.Group alignSelf='center'>
                            <Button>English</Button>
                            <Button>Spanish</Button>
                        </Button.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'exportReports'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Export Reports</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>Coming soon...</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'exportData'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Export Data</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>Coming soon...</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'tutorials'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Tutorials</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>Here you can find tutorials about the app's features.</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'share'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Share</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>Share this app with your friends:</Text>
                        <Button mt={4}>Copy Link</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'about'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>About</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>This app was developed by Team 0.</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={modalVisible === 'contact'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Contact</Modal.Header>
                    <Modal.Body>
                        <VStack space={4} px={4} mt={2} mb={2}>
                            <Pressable
                                _pressed={{ bg: "coolGray.100" }}
                            >
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    px={4}
                                    py={3}
                                    borderColor="coolGray.300"
                                >
                                    <HStack space={3} alignItems="center">
                                        <Icon
                                            as={Ionicons}
                                            name="logo-facebook"
                                            size="lg"
                                            color="blue.600"
                                        />
                                        <Text fontSize="md" color={textColor}>
                                            Facebook
                                        </Text>
                                    </HStack>
                                    <Icon
                                        as={Ionicons}
                                        name="chevron-forward-outline"
                                        size="lg"
                                        color="coolGray.400"
                                    />
                                </HStack>
                            </Pressable>
                            <Pressable
                                _pressed={{ bg: "coolGray.100" }}
                            >
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    px={4}
                                    py={3}
                                    borderColor="coolGray.300"
                                >
                                    <HStack space={3} alignItems="center">
                                        <Icon
                                            as={Ionicons}
                                            name="logo-whatsapp"
                                            size="lg"
                                            color="blue.600"
                                        />
                                        <Text fontSize="md" color={textColor}>
                                            WhatsApp
                                        </Text>
                                    </HStack>
                                    <Icon
                                        as={Ionicons}
                                        name="chevron-forward-outline"
                                        size="lg"
                                        color="coolGray.400"
                                    />
                                </HStack>
                            </Pressable>
                            <Pressable
                                _pressed={{ bg: "coolGray.100" }}
                            >
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                    px={4}
                                    py={3}
                                    borderColor="coolGray.300"
                                >
                                    <HStack space={3} alignItems="center">
                                        <Icon
                                            as={Ionicons}
                                            name="mail-outline"
                                            size="lg"
                                            color="blue.600"
                                        />
                                        <Text fontSize="md" color={textColor}>
                                            Email
                                        </Text>
                                    </HStack>
                                    <Icon
                                        as={Ionicons}
                                        name="chevron-forward-outline"
                                        size="lg"
                                        color="coolGray.400"
                                    />
                                </HStack>
                            </Pressable>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Modal isOpen={modalVisible === 'logout'} onClose={closeModal}>
                <Modal.Content>
                    <Modal.Header alignSelf='center'>Logout</Modal.Header>
                    <Modal.Body>
                        <Text alignSelf='center'>You are about to logout.</Text>
                        <Text alignSelf='center'>Continue?</Text>
                    </Modal.Body>
                    <Modal.Footer alignSelf='center'>
                        <Button onPress={() => navigation.navigate('Login')} marginRight={8} bg='danger.400'>Logout</Button>
                        <Button onPress={closeModal} marginLeft={8}>Cancel</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </ScrollView>
    );
};

export default ConfigurationScreen;
