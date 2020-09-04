import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';

import { CardSection } from './CardSection';

const TryAgainModal = ({ children, onTryAgain, visible }) => {
  const {
    containerStyle,
    cardSecStyle,
    textStyle,
    innerContainerStyle,
    btnStyle,
    textBtnStyle,
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
            <Text style={textStyle}>{children}</Text>
          </CardSection>
          <CardSection style={cardSecStyle}>
            <TouchableOpacity style={btnStyle} onPress={() => onTryAgain()}>
              <Text style={textBtnStyle}>Thử lại</Text>
            </TouchableOpacity>
          </CardSection>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  cardSecStyle: {
    justifyContent: 'center',
    borderRadius: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
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
  btnStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
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

export { TryAgainModal };
