import React from 'react';
import { Model } from 'react-vr';

export default class ModelView extends React.Component {
    static propTypes = {
        onModelSelect: React.PropTypes.func.isRequired,
        onModelDelete: React.PropTypes.func.isRequired,
        source: React.PropTypes.object.isRequired,
        layoutOrigin: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        wireframe: React.PropTypes.bool,
        isSelected: React.PropTypes.bool,
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
        if (inputEvent.eventType === 'keyup') {
            switch (inputEvent.code) {
                case 'KeyS': this.props.onModelSelect(this.props.id); break;
                case 'KeyX': this.props.onModelDelete(this.props.id); break;
            }
        }
    };

    render() {
        const {transform} = this.props;
        return (
            <Model
                onInput={this.handleInput}
                source={ this.props.source }
                layoutOrigin={ this.props.layoutOrigin }
                wireframe={ this.props.wireframe }
                style={{
                    opacity: this.props.isSelected ? 0.5 : 1,
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