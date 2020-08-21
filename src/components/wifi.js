import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert, Image, PermissionsAndroid
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import QRCode from 'react-native-qrcode-svg';
import {captureRef, captureScreen} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const Wifi = () => {
  const [SSID, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [encryption, setEncryption] = useState('');
  const inputRefs = useRef({encryption: null});
  const [QRValue, setQRValue] = useState('');
  const viewRef = useRef();
  const [URL, setURL] = useState('');
  const [saving, setSaving] = useState(false);

  const handleButtonPress = () => {
    setQRValue(`WIFI:T:${encryption};S:${SSID};P:${password};;`);
    console.log(SSID + ' - ' + password + ' - ' + encryption);
  };

  // get permission Camera Roll
  const cameraRollPermission = async () => {
    let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPermission.status !== 'granted') {
      cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (cameraRollPermission.status !== 'granted') {
        Alert.alert('Permission not granted CameraRoll');
      }
    }
    return cameraRollPermission;
  };

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };
// download image
  const downloadImage = async () => {
    await cameraRollPermission();
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      // cameraroll saves image
      const result = MediaLibrary.saveToLibraryAsync(uri);
      if (result) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text> Create QR Code Wifi Information</Text>
      </View>
      <View style={styles.inputContainer}>
        <KeyboardAvoidingView
          style={styles.inputContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          enabled={Platform.OS === 'ios' ? true : false}
          keyboardVerticalOffset={Platform.select({ios: 0, android: 200})}
        >
          <Input
            label={'Network Name'}
            placeholder={'Network Name'}
            leftIcon={{name: 'wifi', type: 'font-awesome', color: 'gray', size: 24}}
            onChangeText={(SSID) => setSSID(SSID)}
            value={SSID}
            inputStyle={{marginLeft: 10}}
            autoCorrect={false}
            autoCapitalize={"none"}
            disableFullscreenUI={true}
          />
          <Input
            label={'Password'}
            placeholder={'Password'}
            leftIcon={{name: 'key', type: 'font-awesome', color: 'gray', size: 24}}
            onChangeText={(password) => setPassword(password)}
            value={password}
            inputStyle={{marginLeft: 10}}
            autoCorrect={false}
            autoCapitalize={"none"}
            secureTextEntry={showPassword}
            rightIcon={
              <Button
                iconContainerStyle={{
                  paddingHorizontal: 10,
                }}
                buttonStyle={{
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                }}
                onPress={() => setShowPassword(!showPassword)}
                icon={{
                  name: showPassword ? 'eye-slash' : 'eye',
                  size: 24,
                  type: 'font-awesome',
                  color: showPassword ? 'gray' : 'black'
                }}
              />
            }
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.selectContainer}>
        <Text style={styles.formLabel}> Select encryption your wifi network: </Text>
        <RNPickerSelect
          style={{
            inputIOSContainer: styles.inputIOS,
            inputAndroidContainer: styles.inputAndroid,
            viewContainer: {
              justifyContent: 'center',
              marginVertical: 10,
              alignContent: 'center',
            },
            iconContainer: {
              marginRight: 10,
            },
          }}
          placeholder={{
            label: 'Select encryption',
            value: null,
            color: '#9EA0A4',
          }}
          value={encryption}
          useNativeAndroidPickerStyle={Platform.OS === 'ios' ? true : false} //android only
          Icon={() => {
            return (
              <Icon
                name={'md-arrow-down'}
                type={'ionicon'}
                size={24}
                color={'gray'}
              />
            );
          }}
          onUpArrow={() => {
            inputRefs.encryption.focus();
          }}
          onDownArrow={() => {
            inputRefs.encryption.togglePicker();
          }}
          items={[
            {label: 'None', value: 'None'},
            {label: 'WPA/WPA2', value: 'WPA'},
            {label: 'WEP', value: 'WEP'},
          ]}
          onValueChange={(value) => setEncryption(value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={'QR Code Generator'}
          containerStyle={{
            marginTop: Platform.OS === 'ios' ? 20 : 10,
            marginHorizontal: 10,
            borderRadius: 8,
          }}
          buttonStyle={{
            backgroundColor: '#512DA8'
          }}
          color={Platform.OS === 'ios' ? 'white' : '#512DA8'}
          onPress={() => {
            handleButtonPress();
          }}
        />
      </View>
      <View style={styles.viewContainer}>
        <View style={styles.qrcodeContainer} ref={viewRef}>
          <TouchableOpacity onPress={downloadImage}>
            {
              QRValue ?
                <QRCode
                  value={QRValue.length > 0 ? QRValue : 'HaBV'}
                  size={Platform.OS === 'ios' ? 280 : 230}
                  color={'black'}
                  backgroundColor={'white'}
                />
                : <View/>
            }
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: Platform.OS === 'ios' ? 18 : 16, marginLeft: 20}}>
          {'SSID: ' + SSID + '\n' +
          'Password: ' + password + '\n' +
          'Encryption: ' + encryption}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 0.5,
    // backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    flex: Platform.OS === 'ios' ? 2 : 2.5,
    marginHorizontal: 10,
    // backgroundColor: 'green'
  },
  selectContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 20
    // backgroundColor: 'gray'
  },
  viewContainer: {
    flex: Platform.OS === 'ios' ? 4.5 : 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'tomato'
  },
  qrcodeContainer: {
    flex: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formLabel: {
    marginLeft: 15
  },
  inputIOS: {
    marginHorizontal: 17,
    paddingVertical: 7,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginVertical: 7,
    marginHorizontal: 17,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
});
export default Wifi;