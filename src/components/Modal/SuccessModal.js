import React from 'react';
import { View, Modal, Image } from 'react-native';

import {CardSection} from "../general";

const SuccessModal = ({ children, redirectTo, visible }) => {
    const {
        containerStyle,
        cardSecStyle,
        innerContainerStyle,
        cardTopSecStyle
    } = styles;
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => {}}
            transparent
            visible={visible || false}
        >
            <View style={containerStyle}>
                <View style={innerContainerStyle}>
                    <CardSection style={cardTopSecStyle}>
                        {children}
                    </CardSection>
                    <CardSection style={cardSecStyle}>
                        <Image
                            source={require('./success.gif')}
                            style={{width: 100, height: 100 }}
                        />
                    </CardSection>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    cardTopSecStyle: {
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        marginTop: 40,
    },
    cardSecStyle: {
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
    cardBotSecStyle: {
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#fff',
        marginBottom: 40,
    },
    textStyle: {
        flex: 1,
        fontSize: 25,
        textAlign: 'center',
        color: '#55c57a',
        fontWeight: '800',
    },
    subTextStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        color: '#767676',
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },
    innerContainerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
};

export default SuccessModal;
