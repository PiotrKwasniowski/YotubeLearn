import { useState } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, SvgUri } from 'react-native-svg';

const VideoPlayer = ({route}) => {
    const [tab, setTab] = useState('Details');
    return (
        <View style={styles.videoContainer}>
            <View style={styles.player}>
                <Text>sada{route.params.data}</Text>
            </View>
            <Text style={styles.title}>dwadsadwad</Text>
            <View style={styles.chanelContent}>
                <View style={styles.chanelIcon}>
                    <SvgUri width="20" height="20" uri="https://svgshare.com/i/19yc.svg" />
                </View>
                <Text style={styles.chanelName}>Channel name</Text>
            </View>
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.details} onPress={() => setTab('Details')}>
                    <Text style={styles.tabText}>Details</Text>
                    <View style={[
                            styles.bar,
                            { backgroundColor: tab === 'Details' ? '#2b2d42' : '#C8C8C8' }
                    ]}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notes} onPress={() =>{setTab('Notes')}}>
                    <Text style={styles.tabText}>Notes</Text>
                    <View style={[
                            styles.bar,
                            { backgroundColor: tab === 'Notes' ? '#2b2d42' : '#C8C8C8' }
                    ]}/>
                </TouchableOpacity>
            </View>
            <View style = {[styles.detailsData, {display: tab === "Details" ? 'flex' : 'none'}]}>
                <Text style={styles.detailsText}>Details</Text>
                <Text style={styles.descText}>Details</Text>
                <Text style={styles.detailsText}>Statistics</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.stats}>
                        <SvgUri width="20" height="20" uri="https://svgshare.com/i/19yh.svg" />
                        <Text style={styles.statsText}>100 views</Text>
                    </View>
                    <View style={styles.stats}>
                        <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A04.svg" />
                        <Text style={styles.statsText}>100 likes</Text>
                    </View>
                </View>
            </View> 
            <View style = {[styles.notesData, {display: tab === "Notes" ? 'flex' : 'none'}]}>
                <Text>Notes</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        
        alignItems: 'center',
        height: '100%',
    },
    player: {
        width: '100%',
        height: 280,
        backgroundColor: 'black',
        alignSelf: 'flex-start',
    },
    title:{
        width: 361,
        height: 25,
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 20,
        color: '#2b2d42',
    },
    chanelContent:{
        width: 361,
        height: 100,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    chanelIcon:{
        width: 48,
        height: 48,
        backgroundColor: '#2b2d42',
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chanelName:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 15,
        color: '#2b2d42',
    },
    tabs:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    details:{
        width: "40%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    notes:{
        width: "40%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    bar:{
        width: 181,
        height: 2,
        backgroundColor: '#C8C8C8',
    },
    tabText:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 15,
        color: '#2b2d42',
        alignSelf: 'center',
    },
    detailsData:{
        marginTop: 20,
        width: '85%',
    },
    notesData:{
        marginTop: 20,
        width: '85%',
    },
    detailsText:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '800',
        fontSize: 16,
        color: '#2b2d42',
        marginTop: 10,
    },
    descText:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 12,
        color: '#2b2d42',
    },
    statsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    stats:{
        width: 136,
        height: 32,  
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#2b2d42',
        borderRadius: 10,
        paddingLeft: 10,
        gap: 10,
    },
    statsText:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 12,
        color: '#ffffff',
        alignSelf: 'center',
        marginTop: 5,
    },
});
export default VideoPlayer;