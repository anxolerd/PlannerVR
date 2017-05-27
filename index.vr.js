import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
  VrHeadModel,
} from 'react-vr';
import Storage from './storage';


const DEG_IN_RAD = 57.2958;
const storage = new Storage();

export default class PlannerVR extends React.Component {
  constructor(props) {
    super(props);
    storage.addModel({
        source: { obj: asset('dchair_obj.obj') },
        layoutOrigin: [0.5, 0.5],
        wireframe: true,
        style: {
          transform: [
            { rotateY: 0 },
            { rotateX: 0 },
            { translate: [0, -1, -3]},
            { scale: 0.05 },
            { rotateX: 0 },
            { rotateY: 0 },
          ]
        },
    });
    this.state = { storage };
  }

  handleInput = (evt) => {
    const [radX, radY, radZ] = VrHeadModel.rotationOfHeadMatrix();

    const inputEvent = evt.nativeEvent.inputEvent;
    let storage = this.state.storage.clone();

    let currentModel = storage.currentModel;

    currentModel.style.transform[0].rotateY = radY * DEG_IN_RAD;
    currentModel.style.transform[1].rotateX = radX * DEG_IN_RAD;
    currentModel.style.transform[4].rotateX = -radX * DEG_IN_RAD;


    if (inputEvent.eventType === 'keyup') {
      if (inputEvent.code === 'KeyZ') {
        currentModel.style.transform[2].translate[2] -= 1;
      }
      if (inputEvent.code === 'KeyA') {
          currentModel.style.transform[2].translate[2] += 1;
      }
      if (inputEvent.code === 'KeyQ') {
          currentModel.style.transform[5].rotateY += 3;
      }
      if (inputEvent.code === 'KeyE') {
          currentModel.style.transform[5].rotateY -= 3;
      }
      if (inputEvent.code === 'KeyN') {
          storage.addModel({
              source: { obj: asset('dchair_obj.obj') },
              layoutOrigin: [0.5, 0.5],
              wireframe: true,
              style: {
                  transform: [
                      { rotateY: radY * DEG_IN_RAD },
                      { rotateX: radX * DEG_IN_RAD },
                      { translate: [0, -1, -3]},
                      { scale: 0.05 },
                      { rotateX: -radX * DEG_IN_RAD },
                      { rotateY: 0 },
                  ]
              },
          })
      }
    }
    this.setState({ storage });
  };

  render() {
    return (
      <View onInput={ this.handleInput }>
        <Pano source={asset('house-of-scientists.jpg')}/>
        {this.state.storage.models.map((props) => <Model { ...props }/>)}
      </View>
    );
  }
};

AppRegistry.registerComponent('PlannerVR', () => PlannerVR);
