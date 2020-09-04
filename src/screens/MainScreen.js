import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Wifi from "../components/wifi";
import Contact from "../components/contact";
import {Icon} from "react-native-elements";

const Tab = createBottomTabNavigator();

export const MainNavigator = (props) => {
return (
  <Tab.Navigator
    initialRouteName={'Wifi'}
    tabBarOptions={{
      activeTintColor: '#1EC8BE'
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({color, focused}) => {
        let iconName;
        let iconType = 'font-awesome';
        let size;
        if (route.name === 'Wifi') {
          iconName = `wifi${focused ? '' : ''}`;
          size = 24;
          iconType = 'font-awesome';
        } else if (route.name === 'Contact') {
          iconName = `contacts${focused ? '' : ''}`
          size = 24;
          iconType = 'ant-design'
        }
        return (
          <Icon name={iconName} type={iconType} size={size} color={color}/>
        );
      }
    })}
  >
    <Tab.Screen
      name={'Wifi'}
      component={Wifi}
      options={{
        title: 'Wifi',
        tabBarLabel: 'Wifi',
      }}
    />
    <Tab.Screen
      name={'Contact'}
      component={Contact}
      options={{
        title: 'Contact',
        tabBarLabel: 'Contact',
      }}
    />
  </Tab.Navigator>
) ;
};

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : ''}/>
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <MainNavigator/>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MainScreen;