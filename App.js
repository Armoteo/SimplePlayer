import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);

  console.log(audioFiles);

  const getAudioFiles = async () => {
    // let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    // console.log('000', media);
    // media = await MediaLibrary.getAssetsAsync({
    //   mediaType: 'audio',
    //   first: 40,
    // });

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.audio,
      first: 40,
    });
    console.log('000', media);
    setAudioFiles(media.assets);
  };

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      getAudioFiles();
    }

    // if (!permission.canAskAgain && !permission.granted) {
    //   console.log("user denied and we can't ask again");
    // }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();

      if (status === 'denied' && canAskAgain) {
        // display some allert or request again to read media files.
        getPermission();
      }

      if (status === 'granted') {
        // we want to get all the audio files
        getAudioFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        // we want to display some error to the user
      }
    }
  };

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <FlatList
        data={audioFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.audioTitle}>{item.filename}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
