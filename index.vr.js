import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
} from 'react-vr';

export default class hmhvr extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('skybox.jpg')}/>
        <Text
          style={{
            
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}>
          Hmh
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('hmhvr', () => hmhvr);
