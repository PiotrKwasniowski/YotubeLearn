import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import VideosLists from '../screens/VideosList';
import VideosGroupe from '../screens/VideosGroupe';
import VideoPlayer from '../screens/VideoPlayer';
import Settings from '../screens/Settings';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VideosLists" component={VideosLists} options={{ headerShown: false }} />
      <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />
      <Stack.Screen name="VideoGroupe" component={VideosGroupe} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MyStack;