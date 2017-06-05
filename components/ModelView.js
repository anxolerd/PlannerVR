import React from 'react';
import { Model } from 'react-vr';

export default class ModelView extends React.Component {
    static propTypes = {
        onModelSelect: React.PropTypes.func.isRequired,
        source: React.PropTypes.object.isRequired,
        layoutOrigin: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        wireframe: React.PropTypes.bool,
        transform: React.PropTypes.shape({
            baseRot: React.PropTypes.shape({
                X: React.PropTypes.number.isRequired,
                Y: React.PropTypes.number.isRequired,
                Z: React.PropTypes.number,
            }),
            scale: React.PropTypes.number.isRequired,
            distance: React.PropTypes.number.isRequired,
            objRotY: React.PropTypes.number.isRequired,
        }).isRequired,
    };

    handleInput = ({nativeEvent: {inputEvent}}) => {
        if (
            inputEvent.eventType === 'keyup'
            && inputEvent.code === 'KeyS'
        ) { this.props.onModelSelect(this.props.id) }
    };

    render() {
        const {source, layoutOrigin, wireframe, transform} = this.props;
        return (
            <Model
                onInput={this.handleInput}
                source={ source }
                layoutOrigin={ layoutOrigin }
                wireframe={ wireframe }
                style={{
                    transform: [
                        {rotateY: transform.baseRot.Y},
                        {rotateX: transform.baseRot.X},
                        {translate: [0, -1, transform.distance]},
                        {scale: transform.scale,},
                        {rotateX: -transform.baseRot.X},
                        {rotateY: transform.objRotY},
                    ]
                }}
            />
        );
    }
}