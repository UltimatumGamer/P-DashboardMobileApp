import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Switch } from "../components";

import nowTheme from "../constants/Theme";

export default class Notifications extends React.Component {
  state = {
    "mentions": true,
    "follows": true,
    "comments": false,
    "seller": false,
  };

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => (
    <Block row middle space="between" style={styles.rows}>
      <Text style={{ fontFamily: 'montserrat-regular' }} size={theme.SIZES.FONT} color={nowTheme.COLORS.HEADER} size={14}>{item.title}</Text>
      <Switch
        onValueChange={() => this.toggleSwitch(item.id)}
        value={this.state[item.id]}
      />
    </Block>
  );

  render() {
    const notifications = [
      { title: "Someone mentions me", id: "mentions"},
      { title: "Anyone follows me", id: "follows" },
      { title: "Someone comments me", id: "comments" },
      { title: "A seller follows me", id: "seller" }
    ];

    return (
      <Block flex style={styles.notification}>
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          ListHeaderComponent={
            <Block style={styles.title}>
              <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} center size={16} color={nowTheme.COLORS.HEADER}>
                Recommended Settings
              </Text>
              <Text style={{ fontFamily: 'montserrat-regular' }} center size={14} color={nowTheme.COLORS.TIME}>
                These are the most important settings
              </Text>
            </Block>
          }
        />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  notification: {
    paddingVertical: theme.SIZES.BASE * 1.4,
  },
  title: {
    paddingTop: theme.SIZES.BASE / 2,
    paddingBottom: theme.SIZES.BASE * 1.5
  },
  rows: {
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE * 1.15
  }
});
