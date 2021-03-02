import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { Icon, Input } from "../components/";

import Images from "../constants/Images";
import nowTheme from "../constants/Theme";

const messages = [
  {
    id: 1,
    avatar: Images.ProfileChat,
    message: `Hey there! How are you today? Can we meet and talk? Thanks!`,
    time: `10:31 PM`
  },
  {
    id: 2,
    message: `Sure, just let me finish something and I’ll call you.`,
    time: `10:34 PM`
  },
  {
    id: 3,
    avatar: Images.ProfileChat,
    message: `OK. Cool! See you!`,
    time: `10:35 PM`
  },
  {
    id: 4,
    message: `Bye bye`,
    time: `10:36 PM`
  }
];

export default class Chat extends React.Component {
  state = {
    messages: messages,
    height: 0
  };

  messagesScroll = React.createRef();

  itemLayout = (data, index) => ({
    length: this.state.messages.length - 1,
    offset: 32 * index,
    index
  });

  handleScroll = () => {
    // const totalIndex = this.state.messages.length - 1;
    // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    setTimeout(() => {
      this.messagesScroll.current.scrollToOffset({ offset: this.state.height });
    }, 1);
  };

  onContentSizeChange = (width, height) => {
    this.setState({
      height
    });
  };

  renderMessage = msg => {
    if (msg.avatar) {
      return (
        <Block key={msg.id}>
          <Block row space={null}>
            <Image
              source={{ uri: msg.avatar }}
              style={[styles.avatar, styles.shadow]}
            />
            <Block style={styles.messageCardWrapper}>
              <Block style={[styles.messageCard, styles.shadow]}>
                <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.TEXT}>{msg.message}</Text>
              </Block>
              <Block right>
                <Text style={styles.time}>{msg.time}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      );
    }

    return (
      <Block key={msg.id} right>
        <Block row>
          <Block style={styles.messageCardWrapper}>
            <Block style={[styles.messageCardPersonal, styles.shadow]}>
              <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.WHITE}>{msg.message}</Text>
            </Block>
            <Block right>
              <Text style={[styles.time, { marginRight: 8 }]}>{msg.time}</Text>
            </Block>
          </Block>
          <Image
            source={Images.ProfilePicture }
            style={[styles.avatar, styles.shadow]}
          />
        </Block>
      </Block>
    );
  };

  renderMessages = () => {
    const insetBottom =
      this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    return (
      <FlatList
        ref={this.messagesScroll}
        data={this.state.messages}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        getItemLayout={this.itemLayout}
        contentContainerStyle={[styles.messagesWrapper]}
        renderItem={({ item }) => this.renderMessage(item)}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  };

  handleMessageChange = (type, text) => {
    this.setState({ message: text });
  };

  handleMessage = () => {
    const { messages, message } = this.state;
    const date = new Date();

    messages.push({
      id: messages.length + 1,
      message: message,
      time: date.toLocaleString("en-US", { hour: "2-digit", minute: "numeric" })
    });

    this.setState({ messages, message: "" });
    this.handleScroll();
  };

  messageForm = () => {
    const { navigation } = this.props;

    return (
      <View style={styles.messageFormContainer}>
        <Block>
        <Input
            placeholder="Message"
            shadowless
            defaultValue={this.state.message}
            onSubmitEditing={this.handleMessage}
            onChangeText={text => this.handleMessageChange("message", text)}
            iconContent={
                <Icon
                size={11}
                style={{ marginRight: 10 }}
                color={nowTheme.COLORS.ICON}
                name="image2x"
                family="NowExtra"
                />
            }
          />
        </Block>
      </View>
    );
  };

  render() {
    return (
      <Block flex space="between">
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={theme.SIZES.BASE * 3.2}
        >
          {this.renderMessages()}
          {this.messageForm()}
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  messageFormContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32
  },
  input: {
    height: theme.SIZES.BASE * 3,
    backgroundColor: theme.COLORS.WHITE
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "transparent"
  },
  messagesWrapper: {
    flexGrow: 1,
    top: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 16,
    paddingBottom: 56
  },
  messageCardWrapper: {
    maxWidth: "85%",
    marginLeft: 8,
    marginBottom: 32
  },
  messageCard: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 3,
    backgroundColor: nowTheme.COLORS.WHITE
  },
  messageCardPersonal: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: nowTheme.COLORS.PRIMARY
  },
  shadow: {
    shadowColor: "rgba(0, 5, 15, 0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1
  },
  time: {
    fontFamily: 'montserrat-regular',
    fontSize: 11,
    fontWeight: "400",
    color: nowTheme.COLORS.TIME,
    marginTop: 8
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE
  }
});
