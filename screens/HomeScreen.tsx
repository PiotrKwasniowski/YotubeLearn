import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';


const HomeScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });

      if (!fontsLoaded) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Image style={styles.img} source={require('../assets/app-icon.png')} />
      <Text style={styles.text}>
        Welcome to the best YouTube-based learning application.
      </Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VideoGroupe')}
      >
        <Text style={styles.buttonText}>Log in as guest</Text>
      </TouchableOpacity>
      
      <Text style={styles.regulations}>
        By continuing, you agree with
      </Text>
      <Text style={styles.regulations}>
        <Text style={styles.link}>
          Terms and Conditions
        </Text>{' '}
        and{' '}
        <Text style={styles.link}>
          Privacy Policy
        </Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8D99AE',
  },
  logo: {
    width: 292,
    height: 116,
    top: -160,
  },
  img: {
    width: 128,
    height: 128,
  },
  text: {
    width: 327,
    height: 72,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: 0.01,
    color: 'white',
    top: 120,
    fontWeight: 'bold',

  },
  button: {
    width: 327,
    height: 48,
    backgroundColor: '#2B2D42',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    top: 130,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  regulations: {
    marginTop: 3,
    width: 270,
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    top: 160,
  },
  link: {
    color: '#2B2D42', 
    textDecorationLine: 'underline', 
  },
});

export default HomeScreen;
