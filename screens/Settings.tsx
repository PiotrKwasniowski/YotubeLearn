import React, { useState } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Svg, SvgUri } from 'react-native-svg';

const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.back} onPress={() => {navigation.navigate('VideosLists')}}>
        <SvgUri style={styles.leftArrow} width="32" height="32" uri="https://svgshare.com/i/19yb.svg" />
        <Text style={styles.backText}>Settings</Text>
      </TouchableOpacity>
      <View style={styles.profile}>
        <View style={styles.personIcon}>
          <SvgUri width="25" height="25" uri="https://svgshare.com/i/19yc.svg" fill='#2B2D42' />
        </View>
        <Text style={styles.profileText}>John Doe</Text>
      </View>
      <View style={styles.line}/>
      <View style={styles.infoContainer}>
        <View style={styles.title}>
          <SvgUri width="36" height="36" uri="https://svgshare.com/i/19yz.svg" fill='#2B2D42' />
          <Text style={styles.titleText}>Learning reminders</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>Repeat everyday at:</Text>
          <View style={styles.time}>
              <SvgUri width="24" height="24" uri="https://svgshare.com/i/19yd.svg" fill='#2B2D42' />
              <Text style={styles.mainText}>12:00</Text>
          </View>
          <Switch
            trackColor={{ false: '#2B2D42', true: '#2B2D42' }}
            ios_backgroundColor="#3e3e3e" 
            onValueChange={toggleSwitch}
            value={isEnabled} 
          />
        </View>
        <Text style={styles.reminder}>You will receive friendly reminder to remember to study</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back:{
    display: 'flex',
    flexDirection: 'row',
    width: '40%',
    height: 40,
    marginTop: 60,
  },
  backText:{
    width: 80,
    height: 40,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#2B2D42',
    alignSelf: 'center',
    marginLeft: 24,
  },
  leftArrow:{
    alignSelf: 'center',
    marginLeft:24,  
    marginBottom: 15,
  },
  profile:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  personIcon:{
    backgroundColor: '#2B2D42',
    borderRadius: 50,
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText:{
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#2B2D42',
    marginLeft: 10, 
  },
  line:{
    width: '100%',
    height: 3,
    backgroundColor: '#2B2D42',
    marginTop: 30,
  },
  infoContainer:{
    alignSelf: 'center',
    width: '90%',
    height: 100,
    marginTop: 10,
  },
  title:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderRadius: 10,
    gap: 15,
  },
  titleText:{
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 24,
    color: '#2B2D42',
    marginTop: 5,
  },
  mainContainer:{
    width: '95%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  reminder:{
    fontFamily: 'Poppins-Regular',
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'center',
    

  },
  mainText:{
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#2B2D42',
  },
  time:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    textAlign: 'center',
    alignItems: 'center',
  }
});
export default Settings;