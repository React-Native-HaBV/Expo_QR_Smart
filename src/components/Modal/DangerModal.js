import React from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

import {CardSection} from '../../components/general';

const DangerModal = ({children, onCloseModal, visible, hasButtonClose, content }) => {
    const {
        containerStyle,
        cardSecStyle,
        textStyle,
        innerContainerStyle,
    } = styles;
    return (
        <Modal
            animationType="fade"
            onRequestClose={() => {}}
            transparent
            visible={visible}
        >
            <View style={containerStyle}>
                <View style={innerContainerStyle}>
                    <CardSection style={cardSecStyle}>
                        <View  style={{flex: 1, justifyContent: 'center', marginTop: 20,}} >
                            <Text style={{
                                flex: 1,
                                fontSize: 24,
                                color: '#e46356',
                                textAlign: 'center',
                                lineHeight: 40,
                            }}> Thông báo </Text>
                        </View>
                        {children}
                        <View  style={{flex: 1, alignSelf: 'center',}} >
                            <Text
                                onPress={() => onCloseModal()}
                                style={{
                                // flex: 1,
                                // width: 150,
                                // height: 49,
                                // borderRadius: 20,
                                fontSize: 18,
                                // justifyContent: 'center',
                                // alignItems: 'center',
                                // backgroundColor: 'red',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#e46356',
                                // lineHeight: 45,
                                }}> Tiếp tục </Text>
                        </View>
                    </CardSection>

                </View>
            </View>
        </Modal>
    );
};

const styles = {
    listItemStyle: {
        borderColor: '#fff'
    },
    cardSecStyle: {
        display: 'flex',
        flexDirection: 'column' ,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        height: 250,
    },
    cardSecStyleButtonClose: {
        backgroundColor: 'none',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 50,
        borderBottomWidth: 0,
        padding: 5,
        borderColor: 'none',
    },
    btnStyle: {
        alignItems: "center",
        backgroundColor: '#fff',
        borderRadius: 50,
        marginLeft: 5,
        marginRight: 5,
        width: 55,
        height: 55,
    },
    textStyle: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 40,
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    },
    innerContainerStyle: {
        elevation: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
    },
    textBtnStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
};

export {DangerModal};
