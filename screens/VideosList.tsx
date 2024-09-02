import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SvgUri } from 'react-native-svg';

const VideoLists = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.input}>
                <TouchableOpacity>
                    <SvgUri
                        width="25"
                        height="25"
                        uri="https://svgur.com/i/19wS.svg"
                    />
                </TouchableOpacity>
                <TextInput placeholder="Search videos" />
            </View>
            <TouchableOpacity>
                    <SvgUri
                        width="36"
                        height="36"
                        uri="https://svgur.com/i/19wn.svg"
                    />
            </TouchableOpacity>
            
        </View>
        <View style={styles.reactNative}>
            <View style={styles.reactNativeHeader}>
                <Text style={styles.reactNativeTitle}>React Native</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>Show more</Text>
                </TouchableOpacity>
            </View>

        </View>
        <View style={styles.React}>
            <View style={styles.reactHeader}>
                    <Text style={styles.reactNativeTitle}>React</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
            </View>
        <View style={styles.Typescript}>
            <View style={styles.reactNativeHeader}>
                <Text style={styles.reactNativeTitle}>Typescript</Text>
                <TouchableOpacity>
                    <Text style={styles.link}>Show more</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.footer}>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('VideosLists')}>
                    <SvgUri
                        width="50"
                        height="50"
                        uri="https://svgshare.com/i/19wc.svg"
                    />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe')}>
                    <SvgUri
                        width="50"
                        height="50"
                        uri="https://svgur.com/i/19wS.svg"
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
    header: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 50,
    },
    reactNativeHeader: {
        width: '90%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reactNative:{
        width: '95%',
        height: 218,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 120,
    },
    searchIcon: {
        width: 25,
        height: 20, 
    },
    settingsIcon: {
        width: 32,
        height: 32,
        alignSelf: 'center', 
        marginRight: 10,
    },
    input: {
        minWidth: '75%',
        height: 40,
        borderWidth: 2,
        borderColor: '#2B2D42',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 16,
        marginLeft: 10,
        gap: 10,
    },
    reactNativeTitle: {
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 18, 
        lineHeight: 24,
        textAlign: 'center', 
        letterSpacing: 0.01, 
        color: '#2B2D42', 
        alignSelf: 'center',
    },
    link:{
        color: '#2B2D42', 
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Regular', 
        alignSelf: 'center',

    },
    React: {
        borderWidth: 2,
        borderColor: '#2B2D42',
        width: '102%',
        height: 218,
        position: 'absolute',
        top: 300,
    },
    reactHeader: {
        width: '90%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 25,
    },
    Typescript: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 520,
    },

    footer: {
        width: '100%',
        height: 100,
        position: 'static',
        bottom: -370,
        backgroundColor: '#8D99AE',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80,
    },
    home: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    search: {
        textAlign: 'center',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    }
});
export default VideoLists;



