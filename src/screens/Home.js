import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Center, Box, Text, Button, VStack, useColorModeValue, Image, HStack, ScrollView } from 'native-base';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { PieChart } from 'react-native-chart-kit';

const HomeScreen = ({ navigation }) => {
    const [activityData, setActivityData] = useState({});
    const [labData, setLabData] = useState({});
    const [loading, setLoading] = useState(true);

    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Referencias válidas a documentos
                const activityDocRef = doc(db, 'activity', 'day');
                const labDocRef = doc(db, 'labs', 'lab-1');

                // Obteniendo los datos
                const activityDoc = await getDoc(activityDocRef);
                const labDoc = await getDoc(labDocRef);

                if (activityDoc.exists()) {
                    setActivityData(activityDoc.data());
                } else {
                    console.log('No such document in activity!');
                }

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

    const chartData = [
        { name: 'CH₂O', population: activityData.butano ? 20 : 0, color: 'red', legendFontColor: 'white', legendFontSize: 12 },
        { name: 'C₄H₁₀', population: activityData.benceno ? 20 : 0, color: 'blue', legendFontColor: 'white', legendFontSize: 12 },
        { name: 'C₆H₆', population: activityData.azufre ? 20 : 0, color: 'green', legendFontColor: 'white', legendFontSize: 12 },
        { name: 'NH₃', population: activityData.amoniaco ? 20 : 0, color: 'yellow', legendFontColor: 'white', legendFontSize: 12 },
        { name: 'SO₂', population: activityData.formaldehido ? 20 : 0, color: 'purple', legendFontColor: 'white', legendFontSize: 12 },
    ];

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView flex={1} bg={bgColor}>
            <Center>
                <Box
                    bg="primary.400"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height={screenHeight * 0.5}
                    zIndex={1}
                    justifyContent="flex-end"
                    py={4}
                    px={4}
                >
                    <VStack justifyContent="center" alignItems="center" space={4}>
                        <Text fontSize="3xl" fontWeight="bold" color="white" textAlign="center" letterSpacing={6}>
                            Activity
                        </Text>
                        <HStack justifyContent="center" space={6} mt={2}>
                            {['Day', 'Week', 'Month', 'Year'].map((label) => (
                                <Button
                                    key={label}
                                    variant="ghost"
                                    _text={{ color: 'white' }}
                                    size="sm"
                                >
                                    {label}
                                </Button>
                            ))}
                        </HStack>
                        <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
                            <Box alignItems="center">
                                <PieChart
                                    data={chartData}
                                    width={screenWidth * 0.9}
                                    height={200}
                                    chartConfig={{
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    }}
                                    accessor="population"
                                    backgroundColor="transparent"
                                />
                            </Box>
                        </TouchableOpacity>
                    </VStack>
                </Box>

                <Box
                    bg="black"
                    width={screenWidth * 0.4}
                    p={4}
                    borderRadius={10}
                    borderColor="coolGray.400"
                    height="10%"
                    justifyContent="center"
                    alignItems="center"
                    mb={2}
                    mt={screenHeight * 0.5}
                    zIndex={1}
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

                <HStack space={4} w="90%" mt={2}>
                    <Box
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius={8}
                        p={4}
                        shadow={2}
                        flex={1}
                        mb={2}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate('Sensors')}>
                            <Text fontSize="lg" fontWeight="bold" mb={2} color={textColor} alignSelf='center'>
                                Lab-1
                            </Text>
                            <Image
                                source={require('../../assets/Sensor.png')}
                                style={{ width: '100%', height: 90, marginBottom: 1, alignSelf: 'center' }}
                                resizeMode="contain"
                            />
                            <Text fontSize="sm" color={textColor}>Status: {labData.status}</Text>
                            <Text fontSize="sm" color={textColor}>Alarm: {labData.alarm.toLocaleString()}</Text>
                            <Text fontSize="sm" color={textColor}>Last Update: {labData.lastUpdate ? labData.lastUpdate.toDate().toLocaleString() : 'No data'}</Text>
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Center>
        </ScrollView>
    );
};

export default HomeScreen;