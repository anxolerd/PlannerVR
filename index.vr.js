import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
  VrHeadModel,
} from 'react-vr';


const DEG_IN_RAD = 57.2958;

export default class PlannerVR extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      rot: [0,0,0],
      distance: -3,
    };
  }

  handleInput = (evt) => {
    const inputEvent = evt.nativeEvent.inputEvent;
    console.log(inputEvent);
    if (inputEvent.eventType === 'keyup') {
      if (inputEvent.code === 'KeyZ') {
        this.setState({ 
          distance: this.state.distance - 1,
        });
      }
      if (inputEvent.code === 'KeyA') {
        this.setState({ 
          distance: this.state.distance + 1,
        });
      }
    }
    const position = VrHeadModel.positionOfHeadMatrix();
    const rotation = VrHeadModel.rotationOfHeadMatrix();
    const horizFov = VrHeadModel.horizontalFov();
    const vertFov = VrHeadModel.verticalFov();
    this.setState({rot: rotation});
  }

  render() {
    return (
      <View onInput={ this.handleInput }>
        <Pano source={asset('house-of-scientists.jpg')}/>
        <Model
          source={{
            obj: asset('dchair_obj.obj'),
          }}
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [
              { rotateY: this.state.rot[1] * DEG_IN_RAD, },
              { rotateX: this.state.rot[0] * DEG_IN_RAD, },
              { translate: [0, -1, this.state.distance]},
              { scale: 0.05 },
              { rotateX: -this.state.rot[0] * DEG_IN_RAD, },
            ],
          }}
        />
      </View>
    );
  }
};

AppRegistry.registerComponent('PlannerVR', () => PlannerVR);
