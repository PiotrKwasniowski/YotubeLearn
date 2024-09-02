import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

const VideoGroupe = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>VideoGroupe</Text>
      <View style={styles.footer}>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('VideosLists')}>
                    <SvgUri
                        width="50"
                        height="50"
                        uri="https://svgshare.com/i/19wb.svg"
                    />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe')}>
                    <SvgUri
                        width="50"
                        height="50"
                        uri="https://svgshare.com/i/19v_.svg"
                    />
                    <Text style={styles.search} >Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
        height: 120,
        position: 'static',
        bottom: -370,
        backgroundColor: '#8D99AE',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80,
        paddingBottom: 20,
    },
    home: {
        textAlign: 'center',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    search: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    }

});

export default VideoGroupe;