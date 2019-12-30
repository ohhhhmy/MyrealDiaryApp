import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import {AsyncStorage} from 'react-native';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon : ({tintColor}) => (
      <MaterialCommunityIcons name = "calendar-multiselect" size = {30} style = {{color:tintColor}}/>
    )
  }

  _storeData = async() => {
    await AsyncStorage.setItem('@diary : state', JSON.stringify(this.state))
  }
  _getData = async () => {
    const mystate = await AsyncStorage.getItem('@diary : state')
    if(mystate !== null) {
      this.setState(JSON.parse(mystate))
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedDate : '',
      
      Posts : [
      {
        id : 1,
        title : '나의 첫 일기',
        content : '안녕!',
        date : '2019-12-27'
      },
      {
          id : 2,
          title : '12월 26일에 쓴 글',
          content : '본문',
          date : '2019-12-26'
      },
    ]
    }
}
  componentDidMount() {
    this._getData()
    this.props.navigation.addListener(
      'didFocus',
      () => {
        newpost = this.props.navigation.getParam('myparam')
        signal = this.props.navigation.getParam('signal')

        if(newpost) {
          const PrevPosts = [...this.state.Posts]
          this.setState({Posts : PrevPosts.concat(newpost)}, this._storeData)
          this.props.navigation.navigate('MainScreen', {myparam : false})
        }
        else if (signal) {
          const PrevPosts2 = [...this.state.Posts]

          deleteIndex = PrevPosts2.findIndex((index) => {return item.id == signal})
          PrevPosts2.splice(deleteIndex,1)

          this.setState({Posts : PrevPosts2}, this._storeData)
          this.props.navigation.navigate('MainScreen', {signal : false})
        }
      }
    )
  }

  render(){
  return (
    <SafeAreaView style={styles.container}>
      <Text style = {styles.h1}> MyDiaryApp </Text>
      <Calendar
        onDayPress = { (day) => {this.setState(this.state.selectedDate = day)}}
        current = {new Date()}/>
        <ScrollView>
          <FlatList
            data = {this.state.Posts.filter(data => {return data.date == this.state.selectedDate.dateString})}
            renderItem = {({item, index}) => {
              return (
                <TouchableOpacity
                  style = {styles.listitem}
                  onPress = {() => {this.props.navigation.navigate('Detail', {post:item})}}>
                  <View>
                    <Text style = {styles.listtext}>
                      제목 : {item.title}
                    </Text>
                    <Text style = {styles.listtext}>
                      내용 : {item.content}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor = {(item, index) => {return `$(index)`}} />
        </ScrollView>
    </SafeAreaView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,  
  },

  h1 : {
    fontSize : 20,
    fontStyle : 'italic',
    color : '#D899F8',
    marginBottom : 20,
    fontWeight : 'bold',
    textAlign : 'center'
  },

  listitem : {
    marginLeft : 50,
    marginTop : 20,
    borderLeftColor : "purple",
    borderLeftWidth : 4,
    paddingLeft : 30,
  },

  listtext : {
    fontSize : 20,
    },

  textstyle : {
    fontSize : 40,
  },
});
