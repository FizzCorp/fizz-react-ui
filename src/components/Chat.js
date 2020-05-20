import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ChatContext } from '../context';

import { css } from 'emotion';
const chatStyles = css`
  @font-face: {
    font-family: Lato;
    src: url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin);
  };
  font-size: 14px;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-width: 320px;
  background: #fff;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
  width: 100%;
  height: 100vh;
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: column;
  justify-content: center;
  display: inline;
`;

const FizzClient  = require('fizz-client');

export class Chat extends Component {
  static propTypes = {
    appId: PropTypes.string.isRequired,
    appSecret: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      clientInitialized: false
    }
  }

  async initializeClient() {
    console.log("Chat: Initializing client, change-in-props or initialized");
    const { appId, appSecret, userId, locale } = this.props;
    let client = await FizzClient.create(appId, appSecret, userId, locale);
    this.setState({
      clientInitialized: true, client: client
    });
  }

  componentDidMount() {
    this.initializeClient();
  }

  componentDidUpdate(prevProps) {
    if (this.props.appId && this.props.appSecret && this.props.userId && this.props.locale) {
      if (prevProps.appId && prevProps.appSecret && prevProps.userId && prevProps.locale) {
        if (
               this.props.appId !== prevProps.appId
            || this.props.appSecret !== prevProps.appSecret 
            || this.props.userId !== prevProps.userId
            || this.props.locale !== prevProps.locale
            ) {
              // console.log("Chat: Time to update something from", this.props);
              this.initializeClient();
        }
      }
    }
  }

  getContext = () => {
    const { client, clientInitialized} = this.state;
    const { locale, userId } = this.props;
    return { client, clientInitialized, locale, userId };
  }

  render() {
    return (
      <div  className={`Chat ${chatStyles}`}>
        <ChatContext.Provider value={this.getContext()}>
          {this.state.clientInitialized && this.props.children}
        </ChatContext.Provider>
      </div>
    )
  }
}

export default Chat
