import React from 'react';
import { Text, View, Modal, TouchableOpacity, Image } from 'react-native';

import icon from './img/success_check.png';

export const SuccessModalTwo = ({ children, onBtnPress, visible, mainText, subText, btnText }) => {
    const {containerStyle, innerContainerStyle, mainStyle} = styles;
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => {}}
            transparent
            visible={visible}
        >
            <View style={containerStyle}>
                <View style={innerContainerStyle}>
                    <View style={mainStyle}>
                        <Image source={icon} />
                        <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', paddingLeft: 20, paddingRight: 20, paddingTop: 10, textAlign: 'center'}}>{mainText}</Text>
                        <Text style={{color: '#6a6a6a', fontSize: 16, paddingLeft: 20, paddingRight: 20, paddingTop: 10, textAlign: 'center'}}>{subText}</Text>
                        <TouchableOpacity
                            style={{backgroundColor: '#55c57a', paddingTop: 10, paddingBottom: 10, paddingLeft: 30, paddingRight: 30, borderRadius: 50, marginTop: 0}}
                            onPress={() => onBtnPress()}
                        >
                            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>{btnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },
    innerContainerStyle: {
        borderWidth: 1,
        width: 300,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        alignSelf: 'center',
        marginTop: 10,
    },
    mainStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#fff',
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        position: 'relative',
    }
};
