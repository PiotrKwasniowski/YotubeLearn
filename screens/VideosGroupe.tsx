import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, FlatList, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { API_KEY } from '@env';

const VideoGroupe = ({ navigation, route }) => {
    const [results, setResults] = useState(0);
    const [sort, setSort] = useState('Most Popular');
    const [search, setSearch] = useState(route.params.search);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState(sort);
    const [videos, setVideos] = useState(route.params.data.items);
    const [loading, setLoading] = useState(true);

    // Update results state when videos change
    useEffect(() => {
        if (videos) {
            setResults(route.params.data.pageInfo.resultsPerPage);
            
        }
    }, [videos, route.params.data]);

    // Update loading state based on videos
    useEffect(() => {
        setLoading(!videos);
    }, [videos]);

    // Fetch videos based on search input
    const GetVideos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search}&key=${API_KEY}`);
            const data = await response.json();
            console.log(data);
            setVideos(data.items);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (videos.length > 0) {
            let sortedVideos = [...videos];
            if (selectedSort === 'latest') {
                sortedVideos.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime());
            } else if (selectedSort === 'oldest') {
                sortedVideos.sort((a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime());
            } else if (selectedSort === 'Most Popular') {
               sortedVideos = videos;
            }
            setVideos(sortedVideos);
        }
    }, [sort]);

    const handleConfirm = () => {
        setSort(selectedSort);
        setModalVisible(false);
    };

    const renderVideoItem = ({ item }) => {
        const videoId = item.id.videoId;
        const channelName = item.snippet.channelTitle;  
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.medium.url;
        const videoPublishedAt = new Date(item.snippet.publishedAt).toLocaleDateString();
        

        return (
            <TouchableOpacity key={videoId} style={styles.videoItem} onPress={() => navigation.navigate('VideoPlayer', { data: videoId })}>
                <Image source={{ uri: videoThumbnail }} style={styles.thumbnail} />
                <Text style={styles.channelName}>{channelName}</Text>
                <Text style={styles.title}>{videoTitle}</Text>
                <Text style={styles.publishedAt}>{videoPublishedAt}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input}>
                    <TouchableOpacity onPress={GetVideos}>
                        <SvgUri width="25" height="25" uri="https://svgur.com/i/19wS.svg" />
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={text => setSearch(text)}
                        placeholder="Search videos"
                        value={search}
                    />
                </View>
            </View>
            <View style={styles.menu}>
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>{results} results found for: </Text>
                    <Text style={styles.data}>"{search}"</Text>
                </View>
                <TouchableOpacity style={styles.filters} onPress={() => setModalVisible(true)}>
                    <Text style={styles.filter}>Sort by: </Text>
                    <Text style={styles.filterData}>{sort}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.videoContainer}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={videos}
                        keyExtractor={(item) => item.id.videoId}
                        renderItem={renderVideoItem}
                        contentContainerStyle={styles.videoContainer}
                    />
                )}
            </View>
            <View style={styles.footer}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('VideosLists')}>
                        <SvgUri width="50" height="50" uri="https://svgshare.com/i/19wb.svg" />
                        <Text style={styles.home}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoGroupe', { data: 'React Native' })}>
                        <SvgUri width="50" height="50" uri="https://svgshare.com/i/19v_.svg" />
                        <Text style={styles.search}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Sort records by:</Text>
                        <TouchableOpacity onPress={() => setSelectedSort('latest')} style={styles.checkboxContainer}>
                            <View style={[styles.chekcbox, { backgroundColor: sort === 'latest' ? '#2B2D42' : 'transparent' }]} />
                            <Text style={styles.checkboxLabel}>Upload date: latest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedSort('oldest')} style={styles.checkboxContainer}>
                            <View style={[styles.chekcbox, { backgroundColor: sort === 'oldest' ? '#2B2D42' : 'transparent' }]} />
                            <Text style={styles.checkboxLabel}>Upload date: oldest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedSort('Most Popular')} style={styles.checkboxContainer}>
                            <View style={[styles.chekcbox, { backgroundColor: sort === 'Most Popular' ? '#2B2D42' : 'transparent' }]} />
                            <Text style={styles.checkboxLabel}>Most popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBut} onPress={handleConfirm}>
                            <Text style={{ color: 'white' }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'column',
        marginTop: 55,
        width: '95%',
        height: 60,
        position: 'absolute',
        top: 50,
        zIndex: 1,
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
    filters: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 13,
        
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
        paddingBottom: 4,
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
        height: 40,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },
      modalView: {
        backgroundColor: '#8D99AE',
        width: 320,
        height: 400,
        borderRadius: 10,
        padding: 20,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        
      },
      modalText: {
        fontSize: 18,
        marginBottom: 15,
        color: 'white', 
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkboxLabel: {
        marginLeft: 8,
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        alignSelf: 'center',
      },
      confirmBut:{
            width: 256,
            height: 40,
            backgroundColor: '#2B2D42',
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Poppins-Regular',
            alignSelf: 'center',
            marginTop: 160,
            
      },
      chekcbox:{
            width: 10,
            height: 10,
            borderRadius: 100,
            borderColor: 'white',
            borderWidth:  2,
            alignSelf: 'center',
            marginBottom: 3,
      },
      dataContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 1,
      },
      videoContainer: {
        maxWidth: 400,
        maxHeight: '100%',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        position: 'static',
        top: 80,
    },
    videoItem: {
        maxHeight: 300,
        width: 345,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    thumbnail: {
        width: 340,
        height: 200,
        borderRadius: 8,
    },
    title: {
        width: 330,
        height: 24,
        lineHeight: 24,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        marginLeft: 5,
        
    },
    publishedAt: {
        width: 80,
        height: 24,
        fontSize: 12,
        lineHeight: 24,
        color: '#666',
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    channelName:{
        width: 93,
        height: 25,
        lineHeight: 30,
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        fontWeight: '700',
        marginLeft: 5,
    }
});

export default VideoGroupe;