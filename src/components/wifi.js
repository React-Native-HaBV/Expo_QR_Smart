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

const Wifi = (props) => {
  const [SSID, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [encryption, setEncryption] = useState('');
  const inputRefs = useRef({encryption: null});
  const [QRValue, setQRValue] = useState('');
  const viewRef = useRef();

  useEffect(() => {
    setQRValue(`WIFI:T:${encryption};S:${SSID};P:${password};;`);
  }, [SSID, password, encryption])

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
  // share QR code image
  const shareQRcodeImage = async () => {
    await cameraRollPermission();
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });
      // cameraroll saves image
      const shareOptions = {
        title: 'Share QR code Wifi',
        message: <Image source={{uri: uri}} style={{width: 350, height: 350}}/>,
        url: uri,
      };
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          if (result.activityType.search('SaveToCameraRoll')) {
            alert('QRCode saved');
          }
        } else {
          // shared
          // alert('QR Code shared');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // alert('Share cancelled');
      }
      // }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        enabled={Platform.OS === 'ios' ? true : true}
        keyboardVerticalOffset={Platform.select({ios: 20, android: 70})}
      >
      <View style={styles.container}>
        <View style={[styles.viewQRContainer, styles.shadowStyle]} ref={viewRef}>
          <QRCode
            value={QRValue.length > 0 ? QRValue : 'HaBV'}
            size={280}
            color={'#1EC8BE'}
            backgroundColor={'transparent'}
            quietZone={10}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}> Create QR Code Wifi Information</Text>
        </View>
        <View style={[styles.inputContainer, styles.shadowStyle]}>
            <Input
              // label={'Network Name'}
              placeholder={'Network Name'}
              leftIcon={{name: 'wifi', type: 'font-awesome', color: '#1EC8BE', size: 24}}
              onChangeText={(SSID) => setSSID(SSID)}
              value={SSID}
              inputStyle={{marginLeft: 10, fontSize: 16}}
              inputContainerStyle={{borderBottomWidth: 0.5}}
              containerStyle={{ paddingTop: 10}}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <Input
              // label={'Password'}
              placeholder={'Password'}
              leftIcon={{name: 'key', type: 'font-awesome', color: '#1EC8BE', size: 24}}
              onChangeText={(password) => setPassword(password)}
              value={password}
              inputStyle={{marginLeft: 10, fontSize: 16}}
              inputContainerStyle={{borderBottomWidth: 0.5}}
              containerStyle={{marginTop: -20}}
              autoCorrect={false}
              autoCapitalize={"none"}
              secureTextEntry={showPassword}
              rightIcon={
                <Button
                  iconContainerStyle={{
                    justifyContent: 'flex-end'
                  }}
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                  }}
                  onPress={() => setShowPassword(!showPassword)}
                  icon={{
                    name: showPassword ? 'eye-slash' : 'eye',
                    size: 22,
                    type: 'font-awesome',
                    color: showPassword ? 'gray' : '#1EC8BE'
                  }}
                />
              }
              rightIconContainerStyle={{
                marginRight: -15
              }}
            />
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
                  placeholder: {
                    // color: '#1EC8BE',
                  },
                  inputIOS: {color: '#1EC8BE'},
                  inputAndroid: {color: '#1EC8BE'},
                }}
                placeholder={{
                  label: 'Select encryption',
                  value: null,
                  color: '#A0A0A0',
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
                title={'Share QR Code'}
                containerStyle={{
                  borderRadius: 10,
                }}
                buttonStyle={{
                  backgroundColor: '#1EC8BE'
                }}
                onPress={() => {
                  shareQRcodeImage();
                }}
              />
            </View>

        </View>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8C8C8',
  },
  titleContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    color: '#A0A0A0'
  },
  inputContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20
  },
  selectContainer: {
    justifyContent: 'space-around',
    marginTop: -10
  },
  buttonContainer: {
    marginHorizontal: 10,
    paddingTop: 10
  },
  viewQRContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  formLabel: {
    marginLeft: 10,
    color: '#A0A0A0'
  },
  inputIOS: {
    marginHorizontal: 10,
    paddingVertical: 7,
    paddingRight: 25,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginVertical: 7,
    marginHorizontal: 10,
    paddingRight: 25,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    paddingLeft: 30, // to ensure the text is never behind the icon
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 6.5,
    elevation: 10,
  }
});
export default Wifi;