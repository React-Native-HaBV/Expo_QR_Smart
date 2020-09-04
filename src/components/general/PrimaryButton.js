import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const PrimaryButton = props => {
    const {onPress, style, children, disabled, btnTextStyle} = props;
    const { btnStyle, textBtnStyle } = styles;
    return (
        <TouchableOpacity
            style={[btnStyle, style]}
            onPress={() => onPress()}
            disabled={disabled || false}
        >
            <Text style={[textBtnStyle, btnTextStyle]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    btnStyle: {
        // flex: 1,
        // alignSelf: 'center',
        backgroundColor: '#55c57a',
        borderRadius: 30,
        borderWidth: 1,
        width: 280,
        borderColor: '#55c57a',
        // marginLeft: 80,
        // marginRight: 80,
    },
    textBtnStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 24,
        paddingRight: 24,
    },
};

export { PrimaryButton };
