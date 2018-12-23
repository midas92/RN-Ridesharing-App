import React from "react";
import { Root } from "native-base";
import { createAppContainer, createStackNavigator, createDrawerNavigator } from "react-navigation";

import WelcomePage from "./screens/welcomePage";
import SettingPage from "./screens/settingPage";
import SideBar from "./screens/sidebar";
import Search from "./screens/search";
import LoginPage from './screens/loginPage';
import SignupPage from './screens/signupPage';
import GoDrivePage from './screens/goDrivePage';

const Drawer = createDrawerNavigator(
  {
    Search: { screen: Search },
    GoDrivePage: { screen: GoDrivePage },
    SettingPage: { screen: SettingPage },
  },
  {
    initialRouteName: "Search",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    LoginPage: { screen: LoginPage },
    SignupPage: { screen: SignupPage },
    WelcomePage: { screen: WelcomePage }
  },
  {
    initialRouteName: "WelcomePage",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;
