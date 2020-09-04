import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert, ScrollView, Share, Image
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import {captureRef} from 'react-native-view-shot';
import * as Permissions from 'expo-permissions';

const Splash = () => {
  return (
    <View>
      <Image source={}/>
      <Text> Welcome to QR Smart App</Text>
      <Text> Connect to Wifi</Text>
      <Text> Create a new contact in the user's address book</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default Splash;