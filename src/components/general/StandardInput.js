import React from 'react';
import { View, Text, TextInput } from 'react-native';

const StandardInput = props => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  const {
    label,
    onChangeText,
    secureTextEntry,
    autoCapitalize,
    placeholder,
    returnKeyType,
    autoFocus,
  } = props;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}
        value={props.value}
        onChangeText={onChangeText}
        autoCorrect={false}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize || 'none'}
        returnKeyType={returnKeyType || 'done'}
        autoFocus={autoFocus || false}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    lineHeight: 23,
    fontSize: 18,
    flex: 2,
  },
  labelStyle: {
    paddingLeft: 20,
    lineHeight: 23,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export { StandardInput };
