'use strict';

import React from 'react';
import { AppRegistry, asset, Mesh, Pano, PointLight, Text, View, } from 'react-vr';

class hmhvr extends React.Component {


  constructor() {
    super();
    this.state = {
      rotation: 0,
      total: -1
    };
    this.lastUpdate = Date.now();
    this.rotate = this.rotate.bind(this);
    this.nextState();
  }


  rotate() {
    const now = Date.now();
    const delta = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({
      rotation: this.state.rotation + delta / 20
    });
    this.frameHandle = requestAnimationFrame(this.rotate);
  }

  rand(limit) {

    var num = Math.floor(Math.random() * limit) + 1;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num
  }

  componentDidMount() {
    this.rotate();
  }

  getPointCloudOf(limit, range) {
    var pointCloud = [];
    for (var i = 0; i < limit; i++)
      pointCloud.push([this.rand(range), this.rand(range), -this.rand(range)]);
    return pointCloud;
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  nextState() {
    this.state.total++;
    this.pointCloud = this.getPointCloudOf(this.state.total, 200);
  }

  Monsters() {
    return {
      render: function() {

        return (
          <View>
            { this.props.points.map(function(point, index) {
              
                return <Mesh
                             lit={ true }
                             key={ index }
                             style={ { transform: [{ translate: point }, { scale: 0.01 }, { rotateY: this.props.rotation }], } }
                             source={ { obj: asset('noofle.obj'), mtl: asset('noofle.mtl') } } />
              }, this) }
          </View>
        )
      }
    }
  }


  Decals() {
    return {
      render: function() {

        return (
          <View>
            { this.props.points.map(function(point, index) {
              
                return <Text
                             key={ index }
                             style={ { textAlign: 'center', textAlignVertical: 'center', position: 'absolute', fontSize: 20, layoutOrigin: [0.5, 0.5], transform: [{ translate: point }, { rotateY: this.props.rotation }] } }>
                         Hmh
                       </Text>
              }, this) }
          </View>
        )
      }
    }
  }

  render() {

    return (
      <View>
        <Pano source={ asset('skybox.jpg') } />
        <this.Decals
                    points={ this.pointCloud }
                    rotation={ this.state.rotation }/>
        <PointLight style={ { color: 'white', transform: [{ translate: [0, 400, 700] }] } } />
        <Text
              onInput={() => this.nextState()}
              style={ { backgroundColor: 'grey', padding: 0.1, textAlign: 'center', textAlignVertical: 'center', fontSize: 0.4, position: 'absolute', transform: [{ translate: [0, -2.5, -7] }], layoutOrigin: [0.5, 0.5] } }>
          { this.state.total } objects
        </Text>
      </View>
      );

  }
}

AppRegistry.registerComponent('hmhvr', () => hmhvr);
