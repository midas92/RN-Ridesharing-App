import React, { Component } from "react";
import {
  Container, Header, Title, Content, Text, Button,
  Icon, Left, Right, Body, Separator, ListItem, Toast
} from "native-base";

import styles from "./styles";
import helpers from "../../helpers";

class SettingPage extends Component {

  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Setting</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Separator bordered>
            <Text>Account Management</Text>
          </Separator>
          <ListItem>
            <Text>Edit Profile (TODO)</Text>
          </ListItem>
          <ListItem>
            <Text>Change Password (TODO)</Text>
          </ListItem>
          <Separator bordered>
            <Text>App Setting</Text>
          </Separator>
          <ListItem onPress={this.onLogout}>
            <Text>Logout</Text>
          </ListItem>
          
        </Content>

      </Container>
    );
  }

  async onLogout(){
      await helpers.storage.remove('user').then( ()=>{
        Toast.show({
          text: "Logout Successful.",
          textStyle: { textAlign: 'center' },
          type: "success",
          duration: 3000,
          position: "top"
        });
        this.props.navigation.navigate('WelcomePage');
      })
      .catch( (e)=>{
      Toast.show({
        text: 'something go wrong, please try again later!',
        textStyle: { textAlign: 'center' },
        type: "danger",
        position: "top",
      });
    })
  }
}

export default SettingPage;
