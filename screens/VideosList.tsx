import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { API_KEY } from '@env';

const VideoLists = ({ navigation }) => {
    const [reactVideos, setReactVideos] = useState([]);
    const [reactData, setReactData] = useState([]);
    const [reactNativeVideos, setReactNativeVideos] = useState([]);
    const [reactNativeData, setReactNativeData] = useState([]);
    const [typescriptVideos, setTypescriptVideos] = useState([]);
    const [typescriptData, setTypescriptData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const GetVideos = async (topic) => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${topic}&key=${API_KEY}`);//only 3 videos for save api calls
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetVideos('React Native tutorial programming')
            .then(data => {
                setReactNativeVideos(data.items); 
                setReactNativeData(data);
            });
        GetVideos('React tutorial programming')
            .then(data => {
                setReactVideos(data.items);
                setReactData(data);
            });
        GetVideos('Typescript tutorial programming')
            .then(data => {
                setTypescriptVideos(data.items);
                setTypescriptData(data);
            });
    }, []);

    const renderVideoItem = ({ item }) => {
        const videoId = item.id.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.medium.url;
        const videoPublishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();

        return (
            <TouchableOpacity key={videoId} style={styles.videoItem} onPress={() => navigation.navigate('VideoPlayer', { data: videoId })}>
                <Image source={{ uri: videoThumbnail }} style={styles.thumbnail} />
                <Text style={styles.title}>{videoTitle}</Text>
                <Text style={styles.publishedAt}>{videoPublishedAt}</Text>
            </TouchableOpacity>
        );
    };

    const searching = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${search}&key=${API_KEY}`);//only 3 videos for save api calls
            const data = await response.json();
            navigation.navigate('VideoGroupe', { data: data, search: search });
            setSearch('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input}>
                    <TouchableOpacity onPress={searching}>
                        <SvgUri width="25" height="25" uri="https://svgur.com/i/19wS.svg" />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setSearch(text)}
                        placeholder="Search videos"
                        value={search}
                    />
                </View>
                <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('Settings')}>
                    <SvgUri width="36" height="36" uri="https://svgur.com/i/19wn.svg" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>React Native</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', { data: reactNativeData, search: 'React Native' })}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={reactNativeVideos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        horizontal
                        contentContainerStyle={styles.flatListContent}
                    />
                )}
            </View>
            <View style={styles.bar}/>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>React</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', { data: reactData, search: 'React' })}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={reactVideos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        horizontal
                        contentContainerStyle={styles.flatListContent}
                    />
                )}
            </View>
            <View style={styles.bar}/>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Typescript</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', { data: typescriptData, search: 'Typescript' })}>
                        <Text style={styles.link}>Show more</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={typescriptVideos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        horizontal
                        contentContainerStyle={styles.flatListContent}
                    />
                )}
            </View>

            <View style={styles.footer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe')}>
                        <SvgUri width="50" height="50" uri="https://svgshare.com/i/19wb.svg" />
                        <Text style={styles.home}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('VideosLists')}>
                        <SvgUri width="50" height="50" uri="https://svgshare.com/i/19v_.svg" />
                        <Text style={styles.search}>Search</Text>
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
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
        position: 'absolute',
        top: 50,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2B2D42',
        borderRadius: 16,
        paddingHorizontal: 10,
        height: 40,
        width: '75%',
    },
    settings: {
        marginLeft: 10,
    },
    section: {
        width: '100%',
        minHeight: 150,
        marginBottom: 25,
        top: -10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: '#2B2D42',
    },
    link: {
        color: '#2B2D42',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins-Regular',
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    videoItem: {
        marginRight: 10,
        backgroundColor: '#f9f9f9',
        padding: 4,
        borderRadius: 8,
        
    },
    thumbnail: {
        width: 150,
        height: 100,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',

        maxWidth: 150,
        maxHeight: 20,
    },
    publishedAt: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 90,
        gap: 100,
        backgroundColor: '#8D99AE',
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
    bar:{
        width: '100%',
        height: 2,
        backgroundColor: '#2B2D42',
        margin: 4,
        top: -10,
    }
});

export default VideoLists;