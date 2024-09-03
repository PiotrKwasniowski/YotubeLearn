import { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import {API_KEY} from '@env';

const VideoLists = ({ navigation }) => {
    console.log(API_KEY)
    const [reactVideos, setReactVideos] = useState([]);
    const [reactData, setReactData] = useState([]);
    const [reactNativeVideos, setReactNativeVideos] = useState([]);
    const [reactNativeData, setReactNativeData] = useState([]);
    const [typescriptVideos, setTypescriptVideos] = useState([]);
    const [typescriptData, setTypescriptData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const GetVideos =  async (topic) =>{
        try{
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${topic}&key=${API_KEY}`);
            const data = await response.json();
            return data;
            

        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        GetVideos('React Native tutorial programing')
        .then(data => {
            setReactNativeVideos(data.items); 
            setReactNativeData(data)
        });
        // GetVideos('React tutorial programming')
        // .then(data => {
        //     setReactVideos(data.items);
        //     setReactData(data);
        // })
        // GetVideos('Typescript tutorial programing')
        // .then(data => {
        //     setTypescriptVideos(data.items)
        //     setTypescriptData(data);
        // });
    
    
    }, []);
    const renderVideoItem = ({ item }) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.medium.url;
        const videoPublishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();
    
        return (
          <TouchableOpacity key={videoId} style={styles.videoItem} onPress={() => navigation.navigate('VideoPlayer', {data: videoId})}>
            <Image source={{ uri: videoThumbnail }} style={styles.thumbnail} />
            <Text style={styles.title}>{videoTitle}</Text>
            <Text style={styles.publishedAt}>{videoPublishedAt}</Text>
          </TouchableOpacity>
        );
    };

    const searching = async() => {
        try{
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search}&key=${API_KEY}`);
            const data = await response.json();
            console.log(data)
            navigation.navigate('VideoGroupe', {data: data , search: search});
            setSearch('');
        }catch(error){
            console.log(error);
        }
        
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input}>
                    <TouchableOpacity onPress={searching}>
                        <SvgUri
                            width="25"
                            height="25"
                            uri="https://svgur.com/i/19wS.svg"
                        />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setSearch(text)}
                        placeholder="Search videos"
                        value={search}
                    />
                </View>
                <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('Settings')}>
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
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: reactNativeData, search: 'React Native'})}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View > 
                <View style={styles.videosContainer}>
                    {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <FlatList
                            data={reactNativeVideos}
                            keyExtractor={(item) => item.id.videoId}
                            renderItem={renderVideoItem}
                            contentContainerStyle={styles.videosContainer}
                            />
                       )}
                </View>
                
            </View>
            <View style={styles.React}>
                <View style={styles.reactHeader}>
                    <Text style={styles.reactNativeTitle}>React</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: reactData, search: 'React'})}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.videosContainer}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <FlatList
                        data={reactVideos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        contentContainerStyle={styles.videosContainer}
                        />
                    )}
                </View>
            </View>
            <View style={styles.Typescript}>
                <View style={styles.reactNativeHeader}>
                    <Text style={styles.reactNativeTitle}>Typescript</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: typescriptData, search: 'Typescript'})}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.videosContainer}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <FlatList
                        data={typescriptVideos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        contentContainerStyle={styles.videosContainer}
                        />
                    )}
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
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', {data: reactNativeData, search: 'React Native'})}>
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
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reactNative:{
        width: '100%',
        height: 218,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        top: 100,
        marginBottom: 25,
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
    },
    videosContainer: {
        maxWidth: '100%',
        height: 200,
        marginLeft: 10,
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
    },
    videoItem: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
    },
    thumbnail: {
        width: 150,
        height: 100,
        borderRadius: 8,
    },
    title: {
        width: 150,
        fontSize: 12,
        fontWeight: 'bold',
        
    },
    publishedAt: {
        fontSize: 14,
        color: '#666',
        alignSelf: 'flex-end',
    },
    settings:{
        marginRight: 10,
    }
});
export default VideoLists;



