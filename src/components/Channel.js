import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { ChannelContext, withChatContext } from '../context';
import { MESSAGE_STATE } from '../constants';

const generateMessageJson = (params) => {
  const _id = moment().valueOf();
  const { nick, message, channelId } = params;
  return {
    _id,
    _nick: nick,
    _from: nick,
    _created: _id,
    _to: channelId,
    _body: message,
    _topic: channelId,
    _status: MESSAGE_STATE.PENDING
  };
}

class Channel extends Component {
  static propTypes = {
    channelId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      messages: {}
    }
  }

  hookChatEvents = (client) => {
    // Hook connected event. Fired everytime the client connectes to the message broker.
    client.chat.on('connected', async (syncRequired) => {

      // Update state on UI (e.g. enable message input field)
      this.setState({
        connected: true
      });

      try {
          if (syncRequired) { // Sync client state, always subscribe in connected listener
              await client.chat.subscribe('global-channel');

              // query the last(most recent) 50 messages published in the channel
              let messages = await client.chat.queryLatest('global-channel', 50);

              // Update messages on UI
              this.setState({
                messages: Object.assign({}, messages.reduce((result, item) => { result[item._id] = item; return result; }, {}))
              })
          }
      }
      catch(err) {
          console.error(err);
      }
    });
    // Hook disconnected event. Fired everytime the client disconnects from the message broker.
    client.chat.on('disconnected', () => {
      // update state on UI (e.g. disable message input field)
      this.setState({ connected: false })
    });
    // Hook the messagePublished event. Fired everytime a message is published to a subscribed channel.
    client.chat.on('messagePublished', message => {
      // update state on UI (append message to channel message list control)
      let data = message._data && JSON.parse(message._data);
      let messageRefId = data && data._refId;
      let messages = JSON.parse(JSON.stringify(this.state.messages));
      if (messageRefId && messages[messageRefId]) delete messages[messageRefId];
      messages = {
        ...messages,
        ...{ [message._id]: message }
      };
      this.setState({ messages, messages });
    });
    // Hook the messageUpdated event. Fired everytime a message is updated in a subscribed channel.
    client.chat.on('messageUpdated', message => {
      // update state on UI (update message in channel message list control)
      let messages = {
        ...this.state.messages,
        ...{ [message._id]: message }
      }
      this.setState({ messages: messages });
    });
    // Hook the messageDeleted event. Fired everytime a message is deleted from a subscribed channel.
    client.chat.on('messageDeleted', message => {
      // update state on UI (delete message from channel message list control)
      let id = message._id;
      let messages = JSON.parse(JSON.stringify(this.state.messages));
      if (messages[id]) delete messages[id];
      
      this.setState({ messages: messages });

    });

  }

  componentDidMount() {
    let client = this.props.client;
    this.hookChatEvents(client);
  }

  setNewMessageState(message) {
    let messages = {
      ...this.state.messages,
      ...{ [message._id]: message }
    }
    this.setState({ messages: messages });
  }

  sendMessage = (params = {} ) => {
    (async () => {

      const messageItem = generateMessageJson(params);
    
      const { _to, _body, _nick } = messageItem;
      // Update UI with new message with pending state
      this.setNewMessageState(messageItem);
  
      try {
        // Send the actual message, would be available later in a `messagePublished` socket event
        await this.props.client.chat.publishMessage(_to, _nick, _body, JSON.stringify({ _refId: messageItem._id }), true, true, true);
      }
      catch (err) {
        console.log("---> Error sending message", err);
        messageItem._status = MESSAGE_STATE.FAILED
        // Update sent message state to failure
        this.setNewMessageState(messageItem);
      };
      
  
    })();
  }

  handleRetryClick = () => {}
  handleDeletionClick = () => {}
  handleModerationClick = () => {}

  getContext = () => {
    const { channelId, client, clientInitialized, locale, userId } =  this.props;
    const { connected, messages } = this.state;
    const { handleRetryClick, handleDeletionClick, handleModerationClick, sendMessage } = this;

    return {
      channelId, client, clientInitialized, locale, connected, messages,
      sessionUserId: userId,
      sendMessage, handleRetryClick, handleDeletionClick, handleModerationClick
    }
  }

  render() {
    return (
      <div>
        <ChannelContext.Provider value={this.getContext()}>
          {/* Status: {this.state.connected ? 'Connected': 'Disconnected'} */}
          {this.props.children}
        </ChannelContext.Provider>
      </div>
    )
  }
}

export default withChatContext(Channel);