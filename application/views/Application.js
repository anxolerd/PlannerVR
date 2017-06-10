import React from 'react';
import {
    asset,
    Pano,
    View,
    VrHeadModel,
    PointLight,
} from 'react-vr';

import Menu from './Menu';
import ObjectModel from "./ObjectModel";

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {timer: null};
    }
    _isKeyPressed = (event) => {
        return (
            (event.type === 'GamepadInputEvent' && event.button === 0 && event.eventType === 'keydown' && !event.repeat) ||
            (event.type === 'KeyboardInputEvent' && event.code === 'Space' && event.eventType === 'keydown' && !event.repeat) ||
            // (event.type === 'MouseInputEvent' && event.button === 0 && event.eventType === 'mousedown') ||
            (event.type === 'TouchInputEvent' && (event.eventType === 'touchstart' || event.eventType === 'touchmove'))
        );
    };

    handleInput = (event) => {
        if (this._isKeyPressed(event.nativeEvent.inputEvent)) {
            if (!this.props.appUI.isMenuOpen) {
                this.props.actions.appUI.menu.show(this.props.head);
                this.state.timer && clearTimeout(this.state.timer);
                this.setState({timer: setTimeout(
                    () => this.props.actions.appUI.menu.hide(),
                    5000,
                )});
            }
        } else if (
            event.nativeEvent.inputEvent.type === 'KeyboardInputEvent'
            && (
                event.nativeEvent.inputEvent.eventType === 'keypress'
                || event.nativeEvent.inputEvent.eventType === 'keyup'
            )
        ) {
            switch (event.nativeEvent.inputEvent.code) {
                case 'KeyA':
                    this.props.actions.object.moveCloser(this.props.head);
                    this.props.actions.appUI.menu.hide();
                    break;
                case 'KeyZ':
                    this.props.actions.object.moveFurther(this.props.head);
                    this.props.actions.appUI.menu.hide();
                    break;
                case 'KeyR':
                    this.props.actions.object.rotate(this.props.head);
                    this.props.actions.appUI.menu.hide();
                    break;
                case 'Escape':
                    this.props.actions.object.unselect(this.props.head);
                    this.props.actions.appUI.menu.hide();
                    break;
            }
        } else {
            const [X, Y, Z] = VrHeadModel.rotationOfHeadMatrix();
            if (!this.props.appUI.isMenuOpen) {
                this.props.actions.head.rotate({X, Y, Z});
            }
        }
    };

    getMenuItems = () => {
        let items = [];
        if (this.props.models.currentModelId !== null) {
            items.push({
                caption: 'Unselect',
                action: (...args) => {
                    this.props.actions.object.unselect(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'green',
                args: [this.props.head],
            });
            items.push({
                caption: 'Move away',
                action: (...args) => {
                    this.props.actions.object.moveFurther(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'blue',
                args: [this.props.head],
            });
            items.push({
                caption: 'Move closer',
                action: (...args) => {
                    this.props.actions.object.moveCloser(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'blue',
                args: [this.props.head],
            });
            items.push({
                caption: 'Rotate',
                action: (...args) => {
                    this.props.actions.object.rotate(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'blue',
                args: [this.props.head],
            });
            items.push({
                caption: 'Delete',
                action: (...args) => {
                    this.props.actions.object.delete(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'orange',
                args: [this.props.models.currentModelId, this.props.head],
            });
        } else if (this.props.models.focusedModelId !== null) {
            items.push({
                caption: 'Select',
                action: (...args) => {
                    this.props.actions.object.select(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'green',
                args: [this.props.models.focusedModelId, this.props.head],
            });
            items.push({
                caption: 'Delete',
                action: (...args) => {
                    this.props.actions.object.delete(...args);
                    this.props.actions.appUI.menu.hide();
                },
                color: 'orange',
                args: [this.props.models.focusedModelId, this.props.head],
            });
        } else {
            for (let name of ['CHAIR', 'BED_TABLE', 'SOFA', 'BED']) {
                items.push({
                    caption: `Add ${name}`,
                    action: (...args) => {
                        this.props.actions.object.create(...args);
                        this.props.actions.appUI.menu.hide();
                    },
                    color: 'green',
                    args: [name, this.props.head],
                });
            }
        }
        items.push({
            caption: 'Cancel',
            action: this.props.actions.appUI.menu.hide,
            color: 'red',
        });
        return items;
    };


    render = () => (
        <View
            onInput={this.handleInput}
        >
            <Pano source={asset('house-of-scientists.jpg')}/>
            <View>
                <PointLight/>
                {this.props.models.models.map(m => (
                    <ObjectModel
                        {...m}
                        appUI={this.props.appUI}
                        actions={this.props.actions}
                        head={this.props.head}
                        key={m.id}
                        isSelected={m.id === this.props.models.currentModelId}
                    />
                ))}
            </View>
            <View>
                {this.props.appUI.isMenuOpen
                    ? <Menu
                        head={this.props.head}
                        items={this.getMenuItems()}
                    />
                    : null}
            </View>
        </View>
    )
}
