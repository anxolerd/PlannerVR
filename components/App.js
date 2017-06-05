import React from 'react';
import { connect } from 'react-redux'
import {
    asset,
    Pano,
    View,
    VrHeadModel,
} from 'react-vr';
import ModelView from './ModelView';
import * as actions from '../actions';

class App extends React.Component {
    propTypes = {
        onMove: React.PropTypes.func.isRequired,
        onRotateObj: React.PropTypes.func.isRequired,
        onRotateHead: React.PropTypes.func.isRequired,
        onAddModel: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        models: React.PropTypes.array.isRequired,
        currentModelId: React.PropTypes.number.isRequired,
    };

    handleInput = ({nativeEvent: {inputEvent}}) => {
        const id = this.props.currentModelId;
        const [X, Y, Z] = VrHeadModel.rotationOfHeadMatrix();

        if (inputEvent.eventType === 'keyup') {
            switch (inputEvent.code) {
                case 'KeyZ': this.props.onMove('TO', id); break;
                case 'KeyA': this.props.onMove('FROM', id); break;

                case 'KeyQ': this.props.onRotateObj('CCW', id); break;
                case 'KeyE': this.props.onRotateObj('CW', id); break;

                case 'KeyN': this.props.onAddModel({X, Y, Z}); break;

                case 'Escape': this.props.onSelect(-1); break;
            }
        } else {
            this.props.onRotateHead({X, Y, Z}, id);
        }
    };

    render() {
        return (
            <View onInput={ this.handleInput } >
                <Pano source={asset('house-of-scientists.jpg')}/>
                {this.props.models.map((model) => (
                    <ModelView
                        key={model.id}
                        onModelSelect={this.props.onSelect}
                        { ...model }
                    />
                ))}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state.plannerApp;
};
const mapDispatchToProps = (dispatch) => ({
    onMove: (...args) => dispatch(actions.move(...args)),
    onRotateObj: (...args) => dispatch(actions.rotateObj(...args)),
    onRotateHead: (...args) => dispatch(actions.rotateHead(...args)),
    onAddModel: (...args) => dispatch(actions.addModel(...args)),
    onSelect: (...args) => dispatch(actions.select(...args)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
