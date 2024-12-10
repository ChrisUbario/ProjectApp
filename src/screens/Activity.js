import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Center, Box, Text, Button, VStack, useColorModeValue, IconButton, HStack, Icon, useTheme, ScrollView } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { PieChart, BarChart } from 'react-native-chart-kit';

const ActivityScreen = ({ navigation }) => {
    const theme = useTheme();
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const inactiveTintColor = useColorModeValue('black', theme.colors.coolGray[400]);
    const inputBgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

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
        <Center flex={1} bg={bgColor}>
            <Box
                bg="primary.400"
                position="absolute"
                top={0}
                left={0}
                right={0}
                height={screenHeight * 0.5}
                justifyContent="flex-end"
                py={4}
                px={4}
            >
                <Button variant='ghost' _text={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    position: 'absolute',
                }} size='lg'
                    position='absolute' alignSelf='flex-start' zIndex={1}
                    top={'9'} left={'4'}
                    onPress={() => navigation.navigate('Home')}>
                    {'<'}
                </Button>
                {/* Contenido Interno */}
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

            <HStack space={4} w="90%" mt={screenHeight * 0.5}>
                <Box
                    bg={bgColor}
                    borderWidth={1}
                    borderColor="coolGray.300"
                    borderRadius={8}
                    p={4}
                    shadow={2}
                    flex={1}
                >
                    <IconButton
                        icon={
                            <Icon
                                as={Ionicons}
                                name="filter-outline"
                                size={6}
                                color={inactiveTintColor}
                            />
                        }
                        borderRadius={8}
                        bg={inputBgColor}
                        _pressed={{ bg: theme.colors.coolGray[300] }}
                        alignSelf='flex-end'
                    />
                    <BarChart
                        data={{ labels: ['CH₂O', 'C₄H₁₀', 'C₆H₆', 'NH₃', 'SO₂'], datasets: [{ data: chartData.map((item) => item.population) }] }}
                        width={screenWidth * 0.8}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: "#1E2923",
                            color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2,
                            barPercentage: 0.5,
                            useShadowColorFromDataset: false
                        }}
                        style={{
                            borderRadius: 8,
                        }}
                        fromZero={true}
                        horizontal={true}
                        withInnerLines={false}
                    />
                </Box>
            </HStack>
        </Center>
    );
};

export default ActivityScreen;
