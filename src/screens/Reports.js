import React, { useState, useEffect } from 'react';
import {
    Center, Box, Text, Button, VStack, useColorModeValue, Image,
    HStack, useColorMode, useTheme, Input, Icon, IconButton, ScrollView
} from 'native-base';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';

const ReportsScreen = ({ navigation }) => {
    const { colorMode } = useColorMode();
    const theme = useTheme();
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const inactiveTintColor = useColorModeValue('black', theme.colors.coolGray[400]);
    const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
    const textColor = useColorModeValue('light.text.50', 'dark.text.50');
    const inputBgColor = useColorModeValue('light.background.50', 'dark.background.900');

    const [report, setReport] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const getReport = async () => {
            const docRef = doc(db, "reports", "7MF7BR2JgWCBkBIMEMoM");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setReport(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        const getReports = async () => {
            const querySnapshot = await getDocs(collection(db, "reports"));
            const reportsList = querySnapshot.docs.map(doc => doc.data());
            setReports(reportsList);
        };

        getReport();
        getReports();
    }, []);

    if (!report) return <Text>Loading...</Text>;

    return (
        <ScrollView flex={1} bg={bgColor}>
            <Center>
                <Box
                    bg="primary.400"
                    w="100%"
                    height={screenHeight * 0.55}
                    justifyContent="flex-end"
                    py={4}
                    px={4}
                >
                    {/* Contenido Interno */}
                    <VStack justifyContent="center" alignItems="center" space={4}>
                        <Text fontSize="3xl" fontWeight="bold" color="white" textAlign="center" letterSpacing={6}>
                            Reports
                        </Text>
                        <Box
                            bg={bgColor}
                            borderWidth={1}
                            borderColor="coolGray.300"
                            borderRadius={8}
                            p={4}
                            shadow={2}
                            w="90%"
                            mb={2}
                            alignSelf='center'>
                            <Text fontSize="md" fontWeight="bold" mb={2} color={textColor} alignSelf='center'>
                                Most recent
                            </Text>
                            <HStack space={4} w="100%">
                                <Box
                                    bg={bgColor}
                                    borderWidth={1}
                                    borderColor="coolGray.300"
                                    borderRadius={8}
                                    p={4}
                                    shadow={2}
                                    flex={1}>
                                    <Image
                                        source={require('../../assets/Sensor.png')}
                                        style={{
                                            width: '100%',
                                            height: 70,
                                            marginBottom: 2,
                                            alignSelf: 'center',
                                        }} resizeMode='contain' />
                                    <Text fontSize="xs" mb={1} color={textColor} alignSelf="center">
                                        Laboratory
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor} alignSelf="center">
                                        Lab-{report.labId}
                                    </Text>
                                </Box>
                                <Box
                                    bg={bgColor}
                                    borderWidth={1}
                                    borderColor="coolGray.300"
                                    borderRadius={8}
                                    p={4}
                                    shadow={2}
                                    flex={1}
                                    alignContent='center'
                                >
                                    <Text fontSize="xs" mb={1} color={textColor} alignSelf="center">
                                        Datetime
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor} alignSelf="center">
                                        {report.date} {report.time} p.m
                                    </Text>
                                    <Text fontSize="xs" mb={1} color={textColor} alignSelf="center">
                                        Status
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor} alignSelf="center">
                                        Active
                                    </Text>
                                    <Text fontSize="xs" mb={1} color={textColor} alignSelf="center">
                                        Report type
                                    </Text>
                                    <Text fontSize="sm" fontWeight="bold" mb={2} color={textColor} alignSelf="center">
                                        {report.description}
                                    </Text>
                                </Box>
                            </HStack>
                        </Box>
                    </VStack>
                </Box>

                <VStack space={4} w="100%" mt={2} mb="10%" alignItems="center">
                    <Box
                        w="90%"
                        bg={bgColor}
                        borderWidth={1}
                        borderColor={bgColor}
                        borderRadius={8}
                        p={4}
                        alignItems="center"
                    >
                        <HStack space={4} w="90%" mt='0%'>
                            <Input
                                flex={1}
                                placeholder="Search"
                                borderWidth={1}
                                borderColor="coolGray.300"
                                bg={inputBgColor}
                                borderRadius={8}
                                color={textColor}
                                InputLeftElement={
                                    <Icon
                                        as={Ionicons}
                                        name="search-outline"
                                        size={5}
                                        ml={3}
                                        color={inactiveTintColor}
                                    />
                                }
                            />
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
                            />
                        </HStack>
                    </Box>

                    <Box
                        w="100%"
                        bg={bgColor}
                        borderWidth={1}
                        borderColor={bgColor}
                        borderRadius={8}
                        p={2}
                        alignItems="center"
                    >
                        <Box w="100%" mt={0}>
                            <Box borderWidth={1} borderColor="black" borderRadius={8}>
                                <HStack borderBottomWidth={1} borderColor="gray.300" p={2}>
                                    <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>Laboratory</Text>
                                    <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>Date</Text>
                                    <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>Report type</Text>
                                </HStack>
                                {reports.map((r, index) => (
                                    <HStack p={2} key={index}>
                                        <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>Lab-{r.labId}</Text>
                                        <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>{r.date}</Text>
                                        <Text flex={1} textAlign="center" fontSize="sm" color={textColor}>{r.description}</Text>
                                    </HStack>
                                ))}

                            </Box>
                        </Box>

                    </Box>
                </VStack>
            </Center>
        </ScrollView>
    );
};

export default ReportsScreen;
