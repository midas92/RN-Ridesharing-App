import React, { Component } from "react";
import helpers from "../../helpers";
import { Image, View } from "react-native";
import {Avatar} from 'react-native-elements';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const storageManager = helpers.StorageManager.getInstance();
const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-threeriders.png");
const datas = [
  // avalible icon list: https://fontawesome.com/
  {
    name: "Find Ride",
    route: "Search",
    icon: "map-marker",
    bg: "#C5F442"
  },
  {
    name: "Setting",
    route: "SettingPage",
    icon: "cog",
    bg: "#C5F442"
  },
  
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    const user = storageManager.get('user');
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          {/*<Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />*/}
          <View style={styles.flexContainer}>
      <View style={[styles.cell,{padding : 20}]}>
          <Avatar style={{padding : 20}}
              xlarge
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
          />
      </View>
      <View style={styles.cell}>
        <Text style={[styles.text,{color: 'white',fontSize: 24,marginTop:50,marginLeft:15  }]}>{user.nickname}</Text>
      </View>
      
    </View>
                       
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    type="FontAwesome"
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
