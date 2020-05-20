//React Redux
import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Local Imports
import MessagePipeline from './containers/Pipeline';
import { withChannelContext } from '../../context';

import { css } from 'emotion';

const headerStyles = css`
  margin-top: -.14285714em;
  font-size: 1.28571429rem;
  line-height: 1.28571429em;
  margin: calc(2rem - .14285714em) 0 1rem;
  font-weight: 400;
`;

const messagesStyles = css`
  max-height: 81vh;
  overflow-y: auto;
  align-self: start;
  scroll-behavior: smooth;
`;

const messageItems = css`
  background-color: #eee;
  font-size: 1rem;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  margin: 1rem 0;
  padding: 1em 1em;
  border-radius: .28571429rem;
  border: 1px solid rgba(34,36,38,.15);
  display: flex;
  min-height: 81vh;
  align-self: center;
  flex-direction: column;
`;

export class Messages extends Component {
  static propTypes = {
    channelId: PropTypes.string.isRequired,
    sessionUserId: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    handleRetryClick: PropTypes.func.isRequired,
    handleDeletionClick: PropTypes.func.isRequired,
    handleModerationClick: PropTypes.func.isRequired
  }

  componentDidMount() {
    console.log("--> Messsages: ", this.props);
  }

  componentDidUpdate(prevProps) {
    const msgDiv = document.getElementsByClassName('fizz-messages')[0];
    msgDiv.scrollTop = msgDiv.scrollHeight;
  }

  renderMessageList() {

    const { locale, messages, sessionUserId, handleRetryClick, handleDeletionClick, handleModerationClick } = this.props;
    const transformed = MessagePipeline({ locale, messages, sessionUserId, handleRetryClick, handleDeletionClick, handleModerationClick });


    return (
      <div className={`fizz-messages ${messagesStyles}`}>
        <div className={`fizz-message-items ui segment ${messageItems}`}>
          {transformed.map(item => item.component)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h3 className={`ui header ${headerStyles}`}>
          {'Room: ' + this.props.channelId}&nbsp;
          <span style={{fontSize: 14, position: 'relative', top: '-1'}}>({this.props.connected ? 'connected': 'disconnected'})</span>
        </h3>
         {this.renderMessageList()}
      </div>
    )
  }
}



export default withChannelContext(Messages);

