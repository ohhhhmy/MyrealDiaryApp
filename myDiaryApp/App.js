import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'; 
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const BaseNavi = createBottomTabNavigator({
  MainScreen : {
    screen : MainScreen
  },
  DetailScreen : {
    screen : DetailScreen,
    navigationOptions : {
      tabBarIcon : ({tintColor}) => (
        <MaterialCommunityIcons name = "calendar-multiselect" size = {30} style = {{color:tintColor}}/>

      )
    }
  },
  WriteScreen : {
    screen : WriteScreen
  },
},
{
  tabBarOptions : {
    showLabel: false
  }
})

const BaseNavi2 = createStackNavigator(
  {
    Write : WriteScreen,
    Tab : BaseNavi,
    Detail : DetailScreen,
  },
  {
    initialRouteName : 'Tab',
    mode : 'modal',
    headerMode : 'screen'
  }
)
const MyNavi = createAppContainer(BaseNavi2)

export default function App() {
  return (
    <View style={styles.container}>
      <Text></Text>
    <MyNavi/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
