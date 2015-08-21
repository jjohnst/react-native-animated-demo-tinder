'use strict';
import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, PanResponder, NavigatorIOS, TouchableHighlight} from 'react-native';


var GameScreen = require('./GameScreen');
var Instructions = require('./Instructions');
var Leaderboard = require('./Leaderboard');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
    onPlayPress() {
        this.props.navigator.push({
            title: 'Choices',
            component: GameScreen
        });
    }

    onInstPress() {
        this.props.navigator.push({
            title: 'How to Play',
            component: Instructions
        });
    }

    onLeaderPress() {
        this.props.navigator.push({
            title: 'Leaderboard',
            component: Leaderboard
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight underlayColor="#00B2FF" style={styles.button} onPress={this.onInstPress.bind(this)}>
                    <Text style={styles.buttonText}>How to Play</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#00B2FF" style={styles.button} onPress={this.onPlayPress.bind(this)}>
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#00B2FF" style={styles.button} onPress={this.onLeaderPress.bind(this)}>
                    <Text style={styles.buttonText}>Leaderboard</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button:{
    height: 80,
    width: 300,
    borderWidth: 2,
    borderColor: '#00B2FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText:{
    fontSize: 20
  }
});
 
module.exports = HomeScreen;