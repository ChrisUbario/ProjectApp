import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Center, Box, Text, Button, HStack, useColorModeValue, ScrollView, VStack } from 'native-base';
import { LineChart, PieChart, StackedBarChart } from 'react-native-chart-kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';

const MonitorScreen = ({ navigation }) => {
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const screenWidth = Dimensions.get('window').width;

    const [activityData, setActivityData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activityDocRef = doc(db, 'activity', 'day');

                // Obteniendo los datos
                const activityDoc = await getDoc(activityDocRef);

                if (activityDoc.exists()) {
                    setActivityData(activityDoc.data());
                } else {
                    console.log('No such document in activity!');
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
        { name: 'CH₂O', population: activityData.butano ? 20 : 0, color: 'red', legendFontColor: 'black', legendFontSize: 12 },
        { name: 'C₄H₁₀', population: activityData.benceno ? 20 : 0, color: 'blue', legendFontColor: 'black', legendFontSize: 12 },
        { name: 'C₆H₆', population: activityData.azufre ? 20 : 0, color: 'green', legendFontColor: 'black', legendFontSize: 12 },
        { name: 'NH₃', population: activityData.amoniaco ? 20 : 0, color: 'yellow', legendFontColor: 'black', legendFontSize: 12 },
        { name: 'SO₂', population: activityData.formaldehido ? 20 : 0, color: 'purple', legendFontColor: 'black', legendFontSize: 12 },
    ];

    const chartLineData = {
        labels: ['CH₂O', 'C₄H₁₀', 'C₆H₆', 'NH₃', 'SO₂'],
        datasets: [
            {
                data: [
                    activityData.butano ? 20 : 0,
                    activityData.benceno ? 20 : 0,
                    activityData.azufre ? 20 : 0,
                    activityData.amoniaco ? 20 : 0,
                    activityData.formaldehido ? 20 : 0,
                ],
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            },
        ],
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView flex={1} bg={bgColor}>
            <Center>
                <Box
                    bg="primary.400"
                    w="100%"
                    height="20%"
                    justifyContent="flex-end"
                    py={4}
                    px={4}
                >
                    <Text
                        fontSize="3xl"
                        fontWeight="bold"
                        color="white"
                        textAlign="center"
                        letterSpacing={6}
                    >
                        Monitor
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
                </Box>

                {/* Gráfico de barras apiladas */}
                <Box
                    mt={4}
                    w="90%"
                    bg={bgColor}
                    borderWidth={1}
                    borderColor="coolGray.300"
                    borderRadius={8}
                    p={4}
                    shadow={2}
                    alignItems="center"
                    alignContent='center'
                >
                    <StackedBarChart
                        data={{
                            labels: ['Mon', 'Thus', 'Wed', 'Tues', 'Fri'],
                            legend: ['Butano', 'Benceno', 'Azufre', 'Amoniaco', 'Formaldehido'],
                            data: [
                                [activityData.butano ? 20 : 0, activityData.benceno ? 20 : 0, activityData.azufre ? 20 : 0, activityData.amoniaco ? 20 : 0, activityData.formaldehido ? 20 : 0]
                            ],
                            barColors: ['red', 'blue', 'green', 'yellow', 'purple']
                        }}
                        width={screenWidth * 0.88}
                        height={250}
                        chartConfig={{
                            backgroundColor: 'transparent',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            labelColor: () => 'black',
                            propsForLabels: {
                                fontSize: 11,
                            },
                        }}
                        backgroundColor="transparent"
                    />
                </Box>

                {/* Contenedor para gráficos PieChart y LineChart */}
                <VStack space={4} w="100%" mt={4} mb="20%" alignItems="center">
                    {/* Gráfico de PieChart */}
                    <Box
                        w="90%"
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius={8}
                        p={4}
                        shadow={2}
                        alignItems="center"
                    >
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

                    {/* Gráfico de línea */}
                    <Box
                        w="90%"
                        bg={bgColor}
                        borderWidth={1}
                        borderColor="coolGray.300"
                        borderRadius={8}
                        p={4}
                        shadow={2}
                        alignItems="center"
                    >
                        <LineChart
                            data={chartLineData}
                            width={screenWidth * 0.8}
                            height={180}
                            chartConfig={{
                                backgroundColor: 'transparent',
                                backgroundGradientFrom: 'white',
                                backgroundGradientTo: 'white',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: () => 'black',
                            }}
                            backgroundColor="transparent"
                            bezier
                        />
                    </Box>
                </VStack>
            </Center>
        </ScrollView>
    );
};

export default MonitorScreen;
