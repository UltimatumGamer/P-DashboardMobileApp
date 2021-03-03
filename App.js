import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';


export default function App() {
  
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://dashboard.pedda.digital' }}
        style={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    color: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    marginTop: 20,
    backgroundColor: '#666666',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1
  }
});
