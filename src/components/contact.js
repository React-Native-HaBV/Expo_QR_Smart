import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  Alert, Image, ScrollView, Share
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import {captureRef} from 'react-native-view-shot';
import * as Permissions from 'expo-permissions';
import {saveToCameraRoll} from "@react-native-community/cameraroll";

const Contact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [QRValue, setQRValue] = useState('');
  const viewRef = useRef();

  useEffect(() => {
    setQRValue(`MECARD:N:${name};TEL:${phoneNumber};EMAIL:${email};`);
  }, [name, phoneNumber, email]);

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
  // download image
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
        message: <Image source={{uri: uri}} style={{width: 150, height: 150}}/>,
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
        alert('QR Code is not shared')
      }
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
        keyboardVerticalOffset={Platform.select({ios: 20, android: 20})}
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
          <Text style={styles.titleStyle}> Create QR Code Contact Card</Text>
        </View>
        <View style={[styles.inputContainer, styles.shadowStyle]}>
            <Input
              placeholder={'Name'}
              leftIcon={{name: 'user', type: 'font-awesome', color: '#1EC8BE', size: 24}}
              onChangeText={(Name) => setName(Name)}
              value={name}
              inputStyle={{marginLeft: 10, fontSize: 16}}
              inputContainerStyle={{borderBottomWidth: 0.5}}
              containerStyle={{marginTop: 10}}
              autoCorrect={false}
              autoCapitalize={"none"}
            />
            <Input
              placeholder={'Phone Number'}
              leftIcon={{name: 'phone', type: 'font-awesome', color: '#1EC8BE', size: 24}}
              onChangeText={(PhoneNumber) => setPhoneNumber(PhoneNumber)}
              value={phoneNumber}
              inputStyle={{marginLeft: 10, fontSize: 16}}
              inputContainerStyle={{borderBottomWidth: 0.5}}
              containerStyle={{marginTop: -20}}
              autoCorrect={false}
              autoCapitalize={"none"}
              keyboardType={"number-pad"}
            />
            <Input
              placeholder={'Email'}
              leftIcon={{name: 'envelope-o', type: 'font-awesome', color: '#1EC8BE', size: 24}}
              onChangeText={(email) => setEmail(email)}
              value={email}
              inputStyle={{marginLeft: 10, fontSize: 16}}
              inputContainerStyle={{borderBottomWidth: 0.5}}
              containerStyle={{marginTop: -20}}
              autoCorrect={false}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
            <View style={styles.buttonContainer}>
              <Button
                title={'Share QR Code'}
                containerStyle={{
                  borderRadius: 10,
                }}
                buttonStyle={{
                  backgroundColor: '#1EC8BE',
                }}
                titleStyle={{
                  fontSize: Platform.OS === 'ios' ? 18 : 18,
                  fontWeight: 'bold'
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
    backgroundColor: '#C8C8C8'
  },
  titleContainer: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#A0A0A0'
  },
  inputContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
  },
  selectContainer: {
    justifyContent: 'space-around',
    marginTop: -10
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  viewQRContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
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

export default Contact;