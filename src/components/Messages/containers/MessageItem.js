// imports
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Time,
  Delete,
  Status,
  Message,
  Moderate,
  Translate,
  MessageNick,
  MessageBody,
  SeperatorText,
  SeperatorOuter,
  MessageContainer
} from './Styled.js';

import { MESSAGE_STATE } from '../../../constants';

// exports - container
export const Seperator = (props) => {
  return (
    <SeperatorOuter>
      <SeperatorText>{props.text}</SeperatorText>
    </SeperatorOuter>
  );
};

export class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggleTranslationState: false };
  }

  render() {
    const {
      sent,
      locale,
      message,
      showNick,
      nickColor,
      showStatus,
      borderRadius,
      showTranslate,
      showAdminControls,
      handleDeletionClick,
      handleModerationClick
    } = this.props;

    const showOriginal = this.state.toggleTranslationState;
    const translation = message._translations && message._translations[locale];
    const messageBody = (showOriginal) ? message._body : translation || message._body;
    const translationNotSame = translation !== message._body;

    return (
      <MessageContainer sent={sent} borderRadius={borderRadius}>
        <Message>
          <MessageNick color={nickColor} show={showNick}>{message._nick || 'Guest'}</MessageNick>
          <MessageBody>{messageBody}</MessageBody>
        </Message>
        <Time>{moment(message._created).format('LT')}</Time>
        {showStatus && this.renderStatus()}
        {showTranslate && translationNotSame && translation && (
          <Translate
            showOriginal={showOriginal}
            onClick={() => this.setState({ toggleTranslationState: !this.state.toggleTranslationState })}
          >
            <FontAwesomeIcon icon='language' />
          </Translate>
        )}
        {showAdminControls && (
          <Delete onClick={() => { handleDeletionClick(message) }}>
            <FontAwesomeIcon icon='trash-alt' />
          </Delete>
        )}
        {showAdminControls && (
          <Moderate onClick={() => { handleModerationClick({ userId: message._from, channelId: message._to }) }}>
            <FontAwesomeIcon icon='user-secret' />
          </Moderate>
        )}
      </MessageContainer>
    );
  }

  // render helpers
  renderStatus() {
    const { message } = this.props;
    const { _status } = message;

    let iconStyle = {};
    let eventHandler = () => { };
    let iconName = 'check-circle';
    let iconColor = '#21ba45';

    switch (_status) {
      case MESSAGE_STATE.SENT: {
        iconName = 'check';
        iconColor = 'grey';
        break;
      }
      case MESSAGE_STATE.FAILED: {
        iconName = 'exclamation-circle';
        iconColor = 'red';
        break;
      }
      case MESSAGE_STATE.PENDING: {
        iconName = 'sync';
        iconColor = 'grey';
        break;
      }
      default: break;
    }

    return (
      <Status onClick={() => { eventHandler(message) }}>
        <FontAwesomeIcon icon={iconName} color={iconColor} size="xs"/>
      </Status>
    );
  }
};

// exports - chatCells
export const SentFirst = (props) => {
  const myProps = {
    ...props,

    sent: true,
    showNick: false,
    showStatus: true,
    showTranslate: false,
    showAdminControls: false,
    borderRadius: '5px 0 5px 5px'
  };
  return (<MessageItem {...myProps} />);
};

export const SentNormal = (props) => {
  const myProps = {
    ...props,

    sent: true,
    showNick: false,
    showStatus: true,
    showTranslate: false,
    showAdminControls: false,
    borderRadius: '5px 5px 5px 5px'
  };
  return (<MessageItem {...myProps} />);
};

export const ReceiveFirst = (props) => {
  const myProps = {
    ...props,

    sent: false,
    showNick: true,
    showStatus: false,
    showTranslate: true,
    showAdminControls: false,
    borderRadius: '0 5px 5px 5px'
  };
  return (<MessageItem {...myProps} />);
};

export const ReceiveNormal = (props) => {
  const myProps = {
    ...props,

    sent: false,
    showNick: false,
    showStatus: false,
    showTranslate: true,
    showAdminControls: false,
    borderRadius: '5px 5px 5px 5px'
  };
  return (<MessageItem {...myProps} />);
};

// component meta - container
Seperator.propTypes = {
  text: PropTypes.string
};

MessageItem.propTypes = {
  locale: PropTypes.string,
  message: PropTypes.object,
  nickColor: PropTypes.string,
  borderRadius: PropTypes.string,

  sent: PropTypes.bool,
  showNick: PropTypes.bool,
  showStatus: PropTypes.bool,
  showTranslate: PropTypes.bool,
  showAdminControls: PropTypes.bool,

  handleRetryClick: PropTypes.func,
  handleDeletionClick: PropTypes.func,
  handleModerationClick: PropTypes.func
};