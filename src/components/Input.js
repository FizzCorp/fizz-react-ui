import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withChannelContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { css } from 'emotion';


const chatControlContainerStyle = css`
  width: 100%;
  margin-top: 0px;
  display: flex;
  align-self: flex-end;
  align-items: center;
  flex-direction: row;
  background: #eeeeee;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  border-radius: .28571429rem;
  border: 1px solid rgba(34,36,38,.15);
`;

const inputContainerStyle = css`
  width: 95%;
  min-height: 20px;
  margin: 5px 10px;
  border-radius: 21px;
  box-sizing: border-box;
  padding: 9px 18px 11px;
  background-color: #fff;
  border: 1px solid #fff;
`;

const inputTextGroupStyle = css`
  position: relative;
`;

const inputTextStyle  = css`
  z-index: 1;
  outline: 0;
  overflow-y: auto;
  min-height: 20px;
  max-height: 72px;
  padding: 0 0 0 2px;
  overflow-x: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  transition: 0.2s padding ease-in-out;
`;

// #w-input-text:empty + .w-placeholder {
//   opacity: 1;
// }

const placeHolderStyle  = css`
  top: 0;
  opacity: 0;
  color: #a0a0a0;
  -webkit-user-select: none;
  user-select: none;
  position: absolute;
  pointer-events: none;
  transition: 0.2s padding ease-in-out;
`;

const sendButtonStyle = css`
cursor: pointer;
border: none;
margin: 0 .25em 0 0;
padding: .78571429em .78571429em .78571429em;
box-shadow: 0 0 0 0 rgba(34,36,38,.15) inset;
margin-top: auto;
padding-bottom: 15px;
background: transparent;
color: rgb(33, 133, 208);
`;

const buttonIconStyle = css`
opacity: .9;
font-size: 1.5em;
position: relative;
top: 0px;
left: -5px;
`;



export class Input extends Component {
  static propTypes = {
    channelId: PropTypes.string.isRequired,
    sessionUserId: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
  }

  componentDidUpdate(/* prevProps, prevState*/) {
    const textArea = document.getElementById('w-input-text');
    textArea.focus();
  }

  sendMessage = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // const textArea = $('#w-input-text');
    const textArea = document.getElementById('w-input-text');
    const message = textArea.textContent.trim();
    console.log("message: ", message);
    textArea.textContent = '';

    if (message.length === 0) {
      console.error('cannot send empty message!');
    }
    else {
      const { channelId, sessionUserId } = this.props;
      this.props.sendMessage({ message, channelId, nick: sessionUserId });
    }
  }

  handleMessageInput = (event) => {
    if (event.charCode === 13 && !event.shiftKey) {
      this.sendMessage(event);
      return false;
    }

    return true;
  }

  render() {
    const { connected } = this.props;
    return (
      <div className={`chat-controls-container ${chatControlContainerStyle}`}>
        <div id={`w-input-container`} className={inputContainerStyle} >
          <div className={`w-input-text-group ${inputTextGroupStyle}`}>
            <div id={`w-input-text`} className={inputTextStyle} contentEditable={connected} onKeyPress={this.handleMessageInput} />
            <div className={`w-placeholder ${placeHolderStyle}`}>{'Type a message'}</div>
          </div>
        </div>
        <button onClick={this.sendMessage} className={`ui blue button circular icon ${sendButtonStyle}`} >
           {/* <i className="large paper plane icon"></i> */}
           <div className={buttonIconStyle}>
            <FontAwesomeIcon icon="paper-plane" size="lg" />
           </div>
        </button>
      </div>
    )
  }
}

export default withChannelContext(Input);
