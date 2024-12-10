import React from "react";
import { HStack, IconButton, MoonIcon, SunIcon, useColorMode, Box } from "native-base";

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={colorMode === "light" ? "light.background.50" : 
      "dark.background.900"} p={3}>
      <HStack space={2} alignItems="center">
        <IconButton 
        icon={colorMode == "dark" ? 
        <SunIcon color="yellow.500" /> :
        <MoonIcon color="indigo.500" />}
        onPress={toggleColorMode}
        alignSelf="flex-end"
        mb="4"/>
      </HStack>
    </Box>
  );
}

export default ToggleDarkMode;
