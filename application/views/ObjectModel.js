import React from 'react';
import { VrButton, Model } from 'react-vr';


export default class ObjectModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isHovered: false };
    }

    render = () => (
        <VrButton
            onEnter={
                () => {
                    if (this.props.appUI.isMenuOpen) return;
                    this.props.actions.object.focus(this.props.id);
                    this.setState({isHovered: true});
                }
            }
            onExit={
                () => {
                    if (this.props.appUI.isMenuOpen) return;
                    this.props.actions.object.blur(this.props.id);
                    this.setState({isHovered: false});
                }
            }
            style={{
                transform: [
                    {rotateY: (
                        this.props.isSelected
                        ? this.props.head.rot.Y
                        : this.props.headRot.Y
                    )},
                    {rotateX: (
                        this.props.isSelected
                        ? this.props.head.rot.X
                        : this.props.headRot.X
                    )},
                    {translateZ: this.props.distance},
                    {scale: this.props.scale,},
                    {rotateX: -(
                        this.props.isSelected
                            ? this.props.head.rot.X
                            : this.props.headRot.X
                    )},
                    {rotateY: this.props.rotationY},
                ]
            }}
        >
            <Model
                source={this.props.source}
                lit={true}
                layoutOrigin={[0.5, 0.5]}
                style={{
                    opacity: (
                        this.props.isSelected ? 0.5
                        : this.state.isHovered ? 0.7 : 1
                    )
                }}
        />
        </VrButton>
    )
}