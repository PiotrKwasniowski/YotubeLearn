import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { API_KEY } from '@env';
import { TextInput } from 'react-native-paper';
import Video, {VideoRef} from 'react-native-video';

const VideoPlayer = ({ route,navigation }) => {
    const [tab, setTab] = useState('Details');
    const [videoData, setVideoData] = useState(null);
    const videoId = route.params.data;
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');
    const [controls, setControls] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const videoRef = React.useRef<VideoRef>(null);
    const background = require('../assets/video/broadchurch.mp4');

    const onChangeTextInput = (text) => {
        setNote(text);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,statistics`);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    setVideoData(data.items[0]);
                }
            } catch (error) {
                console.error("Error fetching video data: ", error);
            }
        };

        fetchData();
        
    }, [videoId]); 

    useEffect(() => {
        setTimeout(() => {
            setControls(false);
        }, 5000);
    }, [controls]);


    const pauseVideo = () => {
        if(isPaused){
            videoRef.current.resume();
            setIsPaused(false);
            setControls(false);
        }else{
            videoRef.current.pause();
            setIsPaused(true);
            setControls(false);
        }
    };

    const skipForward = () => {
        videoRef.current.getCurrentPosition().then((position) => {
            videoRef.current.seek(position + 5);
        });
        setControls(false);
    };

    const skipBackward = () => {
        videoRef.current.getCurrentPosition().then((position) => {
            videoRef.current.seek(position - 5);
        });
        setControls(false);
    }

    const mute = () => {
        if(isMuted){
            videoRef.current.setVolume(100);
            setIsMuted(false);
        }else{
            videoRef.current.setVolume(0);
            setIsMuted(true);
        }
        
        setControls(false);
    }

    const fullScreen = () => {
        if(isFullScreen){
            videoRef.current.setFullScreen(false);

            setIsFullScreen(false);
        }else{
            videoRef.current.setFullScreen(true);

            setIsFullScreen(true);
        }
        setControls(false);
    }
    return (
        <View style={styles.videoContainer} >
            <TouchableOpacity onPress={()=>{setControls(true)}} style={styles.touchable}>

                <Video
                        style={styles.player}
                        source={background} //on mp4 file
                        // source={{uri: `https://www.youtube.com/embed/ZBCUegTZF7M${videoId}`}} //Youtube videos are not supported by react-native-video

                        ref={videoRef}

                        resizeMode="cover"

                        repeat={true}
                />

            </TouchableOpacity>
            
            <View style={[styles.background,{display: controls ? 'flex' : 'none'}]}/>
            
            <TouchableOpacity 
                style={[
                    styles.pause, 
                    {display: controls  ? 'flex' : 'none'},
                ]}
                onPress={() => {pauseVideo()}}
            >
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A5E.svg"  style={{display: isPaused ? 'none' : 'flex'}}/>

                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A5B.svg" style={{display: isPaused ? 'flex' : 'none'}}/>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.next,{display: controls ? 'flex' : 'none'}]} onPress={skipForward}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A5C.svg" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.prev,{display: controls ? 'flex' : 'none'}]} onPress={skipBackward}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A4S.svg" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.back,{display: controls ? 'flex' : 'none'}]} onPress={()=>{navigation.navigate('VideoGroupe')}}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A50.svg" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.mute,{display: controls ? 'flex' : 'none'}]} onPress={mute}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A40.svg" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.stream,{display: controls ? 'flex' : 'none'}]} onPress={()=>{setControls(false)}}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A3Z.svg" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.fullscreen,{display: controls ? 'flex' : 'none'}]} onPress={fullScreen}>
                <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A4h.svg" />
            </TouchableOpacity>
            <Text style={styles.title}>{videoData ? videoData.snippet.title : "Loading..."}</Text>
            <View style={styles.chanelContent}>
                <View style={styles.chanelIcon}>
                    <SvgUri width="20" height="20" uri="https://svgshare.com/i/19yc.svg" />
                </View>
                <Text style={styles.chanelName}>{videoData ? videoData.snippet.channelTitle : "Loading..."}</Text>
            </View>
            <View style={styles.tabs}>
                <TouchableOpacity style={styles.details} onPress={() => setTab('Details')}>
                    <Text style={styles.tabText}>Details</Text>
                    <View style={[
                            styles.bar,
                            { backgroundColor: tab === 'Details' ? '#2b2d42' : '#C8C8C8' }
                    ]}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notes} onPress={() => setTab('Notes')}>
                    <Text style={styles.tabText}>Notes</Text>
                    <View style={[
                            styles.bar,
                            { backgroundColor: tab === 'Notes' ? '#2b2d42' : '#C8C8C8' }
                    ]}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.detailsData, { display: tab === "Details" ? 'flex' : 'none' }]}>
                <Text style={styles.detailsText}>Details</Text>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.descText}>{videoData ? videoData.snippet.description : "Loading..."}</Text>
                    <Text style={styles.detailsText}>Statistics</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.stats}>
                            <SvgUri width="20" height="20" uri="https://svgshare.com/i/19yh.svg" />
                            <Text style={styles.statsText}>{videoData ? `${videoData.statistics.viewCount} views` : "Loading..."}</Text>
                        </View>
                        <View style={styles.stats}>
                            <SvgUri width="20" height="20" uri="https://svgshare.com/i/1A04.svg" />
                            <Text style={styles.statsText}>{videoData ? `${videoData.statistics.likeCount} likes` : "Loading..."}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={[styles.notesData, { display: tab === "Notes" ? 'flex' : 'none' }]}>
                <View style={styles.notesDataContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <FlatList
                            data={notes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <View style={styles.noteContainer}><Text style={styles.note}>{item}</Text></View>}
                            scrollEnabled={false}  
                        />
                    </ScrollView>
                </View>
                <TextInput
                    style={styles.input}
                    label="Add a note"
                    placeholder='Add a note'
                    onChangeText={onChangeTextInput}
                    value={note}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        setNotes([...notes, note]);
                        setNote('');
                    }}>
                    <Text style={styles.buttonText}>Add note</Text>
                </TouchableOpacity>   
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
        zIndex: -1,
    },
    background:{
        width: '100%',
        height: 280,
        backgroundColor: '#FFFFFF80',
        position: 'absolute',
        top: 0,
        zIndex: 0,
    },
    title: {
        width: '90%',
        height: 25,
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 20,
        color: '#2b2d42',
        marginVertical: 10,
    },
    chanelContent: {
        width: '90%',
        height: 100,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chanelIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#2b2d42',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    chanelName: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 15,
        color: '#2b2d42',
    },
    tabs: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        width: '40%',
        alignItems: 'center',
    },
    notes: {
        width: '40%',
        alignItems: 'center',
    },
    bar: {
        width: '100%',
        height: 2,
        backgroundColor: '#C8C8C8',
        marginTop: 4,
    },
    tabText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 14,
        color: '#2b2d42',
    },
    detailsData: {
        flex: 1,  
        width: '85%',
    },
    notesData: {
        marginTop: 20,
        width: '85%',
    },
    detailsText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '800',
        fontSize: 16,
        color: '#2b2d42',
        marginTop: 10,
    },
    descText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 12,
        color: '#2b2d42',
        marginVertical: 8,
    },
    scrollContent: {
        paddingBottom: 20, 
        
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stats: {
        width: 136,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#2b2d42',
        borderRadius: 10,
        paddingLeft: 10,
        marginRight: 10,
    },
    statsText: {
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 12,
        color: '#ffffff',
        marginTop: 5,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b2d42',
        width: 256,
        height: 40,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 10,

    },
    buttonText:{
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        fontSize: 14,
        color: '#ffffff',   
    },
    input:{
        width: 361,
        height: 60,
        marginTop: 10,
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c8c8c8',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 12,

        
    },
    noteContainer: {
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c8c8c8',
        padding: 5,
        marginTop: 5,
        maxHeight: 300,
    },
    note:{
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        fontWeight: '400',
    },
    notesDataContainer:{
        maxHeight: 200,
        width: '100%',
    },
    pause: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 120,
        zIndex: 1,
    },
    next: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 125,
        left: 280,
        zIndex: 1,
    },
    prev: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 125,
        right: 280,
        zIndex: 1,
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    mute:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 20,
        right: 50,
        zIndex: 1,
    },
    stream:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        borderRadius: 100,
        backgroundColor: '#00000040',
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1,
    },
    fullscreen:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        width: 32,
        position: 'absolute',
        top: 230,
        right: 10,
        zIndex: 1,
    },
    touchable: {
        width: '100%',
        height: 280,
    },

});

export default VideoPlayer;
