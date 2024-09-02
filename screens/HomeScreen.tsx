import React from 'react';
import { Button, View, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Welcome"
        onPress={() => navigation.navigate('VideosLists')}
      />
    </View>
  );
};

export default HomeScreen;