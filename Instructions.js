'use strict';
import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, PanResponder, NavigatorIOS, TouchableHighlight} from 'react-native';


class Instructions extends Component {
  constructor(props) {
    super(props);
  }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerBorder}>
                    <Text style = {styles.header}>Everybody Got Choices</Text>
                </View>
                <Text style ={styles.instruction}>Make choices like E-40 by swiping to the left for Nope! and swiping to the right for Yup!</Text>
                <Text style ={styles.instruction}>Earn points by making the correct choice quickly.</Text>
                <Text style ={styles.instruction}>The game ends when you make the wrong choice.</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerBorder:{
    top: -135,
    width: 375,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#00B2FF'
  },
  header:{
    top: 5,
    alignItems: 'center',
    fontSize: 20,
    paddingBottom: 5,
  },
  instruction:{
    fontSize: 17,
    marginBottom: 10,
    paddingLeft: 10
  }
});
 
module.exports = Instructions;