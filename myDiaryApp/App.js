import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';

const BaseNavi = createBottomTabNavigator({
  MainScreen : {
    screen : MainScreen
  },
  DetailScreen : {
    screen : DetailScreen
  },
  WriteScreen : {
    screen : WriteScreen
  },
})

const MyNavi = createAppContainer(BaseNavi)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    <MyNavi/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
