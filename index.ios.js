'use strict';

import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, PanResponder, NavigatorIOS, TouchableHighlight} from 'react-native';
import clamp from 'clamp';

var GameScreen = require('./GameScreen');
var HomeScreen = require('./HomeScreen');

class Flix extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }

  render() {
    return (
      <NavigatorIOS ref="nav" style={styles.container} initialRoute={{
                component: HomeScreen,
                title: 'Home'
            }} />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Flix', () => Flix);
