import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useState } from 'react';

const VideoGroupe = ({navigation, route}) => {
    const [results, setResults] = useState(0);
    const [sort, setSort] = useState('Most Popular');
    const [Search, setSearch] = useState(route.params.data);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: Search})}>
                        <SvgUri
                            width="25"
                            height="25"
                            uri="https://svgur.com/i/19wS.svg"
                        />
                    </TouchableOpacity>
                    <TextInput onChangeText={text => setSearch(text)} onBlur={() => navigation.navigate('VideoGroupe', {data: Search})} placeholder="Search videos" value={Search} />
                </View>
   
            </View>
            <View style={styles.menu}>

                <Text style={styles.dataText}>{results} results found for: </Text>
                <Text style={styles.data}>"{Search}"</Text>

                <Text style={styles.filter}>Sort by: </Text>
                <Text style={styles.filterData}>{sort}</Text>
            </View>
            <View style={styles.videoContainer}>

            </View>
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
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: 'React Native'})}>
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
    menu: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        height: 60,
        position: 'absolute',
        top: 100,
    },
    dataText:{
        alignSelf: 'flex-start',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
    },
    data: {
        alignSelf: 'flex-start',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
    },
    filter:{
        alignSelf: 'flex-end',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
    },
    filterData:{
        alignSelf: 'flex-end',
        color: '#2B2D42',
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    footer: {
        width: '100%',
        height: 100,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#8D99AE',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80,
        
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
    input: {
        minWidth: '90%',
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

    videoContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 200,
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
});

export default VideoGroupe;