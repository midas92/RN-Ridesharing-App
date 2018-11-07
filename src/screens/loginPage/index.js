import React, { Component } from "react";
import {
  Container, Header, Title, Content, Button, Item, Label,
  Input, Body, Left, Right, Icon, Form, Text, Toast
} from "native-base";
import styles from "./styles";

import helpers from "../../helpers";

const {auth, storage} = helpers;

class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    const { email, password } = this.state;

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input 
                value={email} 
                onChangeText={(email) => this.setState({email})}/>
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                secureTextEntry 
                value={password} 
                onChangeText={(password) => this.setState({password})}
              />
            </Item>
          </Form>

          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.onFormSubmit}>
            <Text>Login In</Text>
          </Button>
        </Content>
      </Container>
    );

  };

  async onFormSubmit(){
    const { email, password } = this.state;

    if(email.length==0){
      Toast.show({
        text: "Please enter your email.",
        textStyle: { textAlign: 'center' },
        type: "warning",
        position: "top"
      });
      return;
    }

    if(password.length==0){
      Toast.show({
        text: "Please enter your password.",
        textStyle: { textAlign: 'center' },
        type: "warning",
        position: "top"
      });
      return;
    }


    try{

      let result = {
        isSuccess: false,
        message: 'something go wrong, please try again later!'
      };
      
      result = await auth.login(email, password);
      
      if(result.isSuccess === true){

        let user = {
          email,
          jwt: result.jwt
        }

        storage.store('user', JSON.stringify(user))
        .then( ()=>{
          Toast.show({
            text: "Login successful!",
            textStyle: { textAlign: 'center' },
            type: "success",
            position: "top",
            duration: 3000
          });
  
          this.props.navigation.navigate('Search');
        })
        .catch((e)=>{
          console.log(e);
        });

      }else{
        Toast.show({
          text: result.message,
          textStyle: { textAlign: 'center' },
          type: "danger",
          position: "top",
        });
      }

    }catch(e){
      console.log(e);
    }

  } // end of onFormSubmit

}

export default LoginPage;
