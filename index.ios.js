'use strict';

import React, { AppRegistry, StyleSheet, Text, Image, View, Animated, Component, PanResponder, Navigator} from 'react-native';
import clamp from 'clamp';

var Play = require('./Play');
var MainScreen = require('./MainScreen');


var SWIPE_THRESHOLD = 120;

class Flix extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
    };
  }

  render() {
    return (
      <Navigator style={styles.container}
    initialRoute={{name: 'Main Screen', index: 0}}
    renderScene={(route, navigator) =>
      <MainScreen
        name={route.name}
        onForward={() => {
          var nextIndex = route.index + 1;
          navigator.push({
            name: 'Play ' + nextIndex,
            index: nextIndex,
          });
        }}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}
      />
    }
  />
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
