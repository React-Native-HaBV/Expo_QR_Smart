import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = props => {
  const { btnStyle, textBtnStyle } = styles;
  return (
    <TouchableOpacity
      style={[btnStyle, props.style]}
      onPress={() => props.onPress()}
    >
      <Text style={textBtnStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  btnStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
  },
  textBtnStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
};

export { Button };
