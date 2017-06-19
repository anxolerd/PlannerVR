import React from 'react';
import { VrButton, Text, View } from 'react-vr';


const DEG_IN_RAD = 57.2958;


class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
        }
    }

    render = () => (
        <VrButton
            onClick={this.props.onClick}
            onEnter={() => {this.setState({isHovered: true})}}
            onExit={() => {this.setState({isHovered: false})}}
            style={{
                margin: 0.1,
                height: 0.4,
                backgroundColor: this.props.color,
                borderColor: this.state.isHovered ? 'yellow' : null,
                borderWidth: this.state.isHovered ? 0.005 : null,
            }}
        >
            <Text style={{fontSize: 0.2, textAlign: 'center'}}>{this.props.caption}</Text>
        </VrButton>
    )
}

MenuItem.propTypes = {
    caption: React.PropTypes.string.isRequired,
    color: React.PropTypes.string,
    onClick: React.PropTypes.func,
};


const Menu = ({head, items}) => (
    <View
        style={{
            flex: 1,
            flexDirection: 'column',
            width: 2,
            alignItems: 'stretch',
            transform: [
                {rotateY: head.rot.Y},
                {rotateX: head.rot.X},
		{translate: [-1, 1, -3]},
            ]
        }}
    >
        {(items || []).map((item, ix) =>
            <MenuItem
                caption={item.caption}
                color={item.color}
                onClick={
                    item.action
                    ? () => item.action(...(item.args || []))
                    : null
                }
                key={`${ix}-${item.caption}`}
            />)}

    </View>
);


Menu.propTypes = {
    head: React.PropTypes.shape({
        rot: React.PropTypes.shape({
            X: React.PropTypes.number.isRequired,
            Y: React.PropTypes.number.isRequired,
            Z: React.PropTypes.number.isRequired,
        })
    }).isRequired,
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            caption: React.PropTypes.string.isRequired,
            color: React.PropTypes.string,
            onClick: React.PropTypes.func,
        })
    ).isRequired,
};


export default Menu;
