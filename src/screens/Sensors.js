import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Center, Box, Text, Button, HStack, useColorModeValue, Image, ScrollView } from 'native-base';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';

const SensorsScreen = ({ navigation }) => {
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const screenWidth = Dimensions.get('window').width;


    const [labData, setLabData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const labDocRef = doc(db, 'labs', 'lab-1');

                const labDoc = await getDoc(labDocRef);

                if (labDoc.exists()) {
                    setLabData(labDoc.data());
                } else {
                    console.log('No such document in labs!');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <Center flex={1} bg={bgColor}>
            <Button variant='ghost' _text={{
                color: textColor,
                fontSize: '24px',
                fontWeight: 'bold',
            }} size='lg'
                position='absolute' alignSelf='flex-start'
                top={'9'} left={'4'}
                onPress={() => navigation.navigate('Home')}>
                {'<'}
            </Button>
            <Box
                bg="black"
                width="40%"
                p={4}
                borderRadius={10}
                borderColor="coolGray.400"
                justifyContent="center"
                alignItems="center"
                mt={4}
                mb={2}
                position="absolute"
                top={'8'}
                height="8%"
                py={4}
                px={4}
            >
                <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="white"
                    letterSpacing={2}
                    textAlign="center"
                >
                    Sensors
                </Text>
            </Box>
            <HStack w="90%" mt={6} alignContent="center" space={1}>
                <Box
                    bg={bgColor}
                    borderWidth={1}
                    borderColor="coolGray.300"
                    borderRadius={8}
                    p={4}
                    shadow={2}
                    flex={1}
                >
                    <Text fontSize="2xl" fontWeight="bold" mb={2} color={textColor} alignSelf='center'>
                        Lab-1
                    </Text>
                    <Image
                        source={require('../../assets/Sensor.png')}
                        style={{ width: '90%', height: 200, marginBottom: 2, alignSelf: 'center' }}
                        resizeMode="contain"
                    />
                    <Text fontSize="sm" color={textColor}>Status: {labData.status}</Text>
                    <Text fontSize="sm" color={textColor}>Alarm: {labData.alarm.toLocaleString()}</Text>
                    <Text fontSize="sm" color={textColor}>Last Update: {labData.lastUpdate ? labData.lastUpdate.toDate().toLocaleString() : 'No data'}</Text>
                </Box>
            </HStack>
        </Center >
    );
};

export default SensorsScreen;
