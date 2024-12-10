import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import {
  Center, Box, Text, Button, VStack, useColorModeValue, Avatar,
  Icon, Row, Input, ScrollView, useToast, Image
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const ProfileSummaryScreen = ({ navigation }) => {
  const bgColor = useColorModeValue('light.background.50', 'dark.background.900');
  const textColor = useColorModeValue('black', 'white');
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [avatarImage, setAvatarImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('')
  const [userInitials, setUserInitials] = useState('');
  const toast = useToast();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    };

    getPermissions();
  }, []);

  const pickAvatarImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatarImage(result.assets[0].uri);
      toast.show({ title: 'Profile updated!', status: 'success' });
    }
  };

  const handleSave = () => {
    if (!avatarImage && userName && userPhone) {
      const initials = userName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
      setUserInitials(initials);
      toast.show({ title: 'Initials generated', status: 'info' });
    } else {
      toast.show({ title: 'Avatar saved', status: 'success' });
    }

    navigation.navigate('Profile', {
      name: userName,
      email: userEmail,
      phone: userPhone,
      avatar: avatarImage,
    });
  };

  return (
    <ScrollView flex={1} bg={bgColor}>
      <Center>
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
          <Button variant='ghost' _text={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            position: 'absolute',
          }} size='lg'
            position='absolute' alignSelf='flex-start' zIndex={1}
            top={'9'} left={'4'}
            onPress={() => navigation.navigate('Profile')}>
            {'<'}
          </Button>
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
            {avatarImage ? (
              <Image
                source={{ uri: avatarImage }}
                alt="Avatar"
                size="xl"
                borderRadius="full"
              />
            ) : (
              <TouchableOpacity onPress={pickAvatarImage}>
                <Avatar size="xl" bg="emerald.600">
                  {userInitials || 'NA'}
                </Avatar>
              </TouchableOpacity>
            )}
            <Box
              bg="black"
              width={screenWidth * 0.4}
              p={4}
              borderRadius={10}
              borderColor="coolGray.400"
              justifyContent="center"
              alignItems="center"
              height='25%'
            >
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="white"
                letterSpacing={2}
                textAlign="center"
              >
                admin01
              </Text>
            </Box>
          </VStack>
        </Box>

        <VStack space={2} width="90%" mt={screenHeight * 0.55}>
          <VStack space={3} width="100%">
            <Row space={3} alignItems="center">
              <Icon as={Ionicons} name="person" size="lg" color="primary.500" />
              <Text fontSize="md" color={textColor}>Name: </Text>
              <Input
                flex={1}
                placeholder="Name"
                color={textColor}
                value={userName}
                onChangeText={setUserName}
              />
            </Row>

            <Row space={3} alignItems="center">
              <Icon as={Ionicons} name="mail" size="lg" color="primary.500" />
              <Text fontSize="md" color={textColor}>Email: </Text>
              <Input
                flex={1}
                placeholder="Email"
                color={textColor}
                value={userEmail}
                onChangeText={setUserEmail}
              />
            </Row>

            <Row space={3} alignItems="center">
              <Icon as={Ionicons} name="call" size="lg" color="primary.500" />
              <Text fontSize="md" color={textColor}>Phone: </Text>
              <Input
                flex={1}
                placeholder="Phone"
                color={textColor}
                value={userPhone}
                onChangeText={setUserPhone}
              />
            </Row>
          </VStack>

          <Button
            mt="5"
            colorScheme="primary"
            width="90%"
            alignSelf="center"
            onPress={handleSave}
          >
            Save
          </Button>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default ProfileSummaryScreen;
