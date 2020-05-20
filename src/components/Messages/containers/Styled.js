// imports
// import styles from './styles.css';
import React from 'react';
import { css } from 'emotion';

const segmentStyle = `
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  margin: 1rem 0;
  padding: 1em 1em;
  border-radius: .28571429rem;
  border: 1px solid rgba(34,36,38,.15);
`

const messageStyles = css`
  text-align: start;
  padding-right: 6px;
  word-break: break-word;
  @media only screen and (max-width: 600px) {
    & {
      padding-right: 2px;
    }
  }
`;

// exports - message container
export const Message = (props) => {
  return (
    <div className={`fizz-message ${messageStyles}`}>
      {props.children}
    </div>
  );
};

const seperatorTextStyle = css`
  text-align: center;
  border-radius: 5px;
  color: #000000a1;
  margin: 12px 0 !important;
  font-size: 12px !important;
  padding: 0px 5px !important;
  background-color: #ffffffe0;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  border-radius: .28571429rem;
  border: 1px solid rgba(34,36,38,.15);
`
export const SeperatorText = (props) => {
  return (
    <div className={`fizz-seperator-text ui segment ${seperatorTextStyle}`}>
      {props.children}
    </div>
  );
};

const seperatorOuterStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SeperatorOuter = (props) => {
  return (
    <div className={`fizz-seperator-outer ${seperatorOuterStyle}`}>
      {props.children}
    </div>
  );
};

const messageContainerStyle = css`
  ${segmentStyle}
  display: flex;
  font-size: 15px;
  line-height: 18px;
  flex-direction: row;
  max-width: calc(60%);
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  padding: 6px !important;
  margin: 3px 0px !important;
  @media only screen and (max-width: 600px) {
    & {
      max-width: calc(93%);
    }
  }
`;

export const MessageContainer = (props) => {
  return (
    <div className={`ui segment fizz-message-container ${messageContainerStyle}`} style={{
      color: 'black',
      borderRadius: `${props.borderRadius || '5px'}`,
      alignSelf: `${props.sent ? 'flex-end' : 'flex-start'}`,
      backgroundColor: `${props.sent ? '#f6ffe0' : 'white'}`
    }}>
      {props.children}
    </div>
  );
};

// exports - message body

const timeStyle = css`
  padding: 0 5px;
  font-size: 11px;
  word-break: normal;
  align-self: flex-end;
  color: rgba(0, 0, 0, 0.45);
`

export const Time = (props) => {
  return (
    <div className={`fizz-time ${timeStyle}`}>
      {props.children}
    </div>
  );
};

const statusStyle = css`
  align-self: flex-end;
`
export const Status = (props) => {
  return (
    <div className={`fizz-status ${statusStyle}`} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const deleteStyle = css`
  cursor: pointer;
  align-self: flex-end;
`
export const Delete = (props) => {
  return (
    <div className={`fizz-delete ${deleteStyle}`} onClick={props.onClick} style={{ color: 'red' }}>
      {props.children}
    </div>
  );
};

const moderateStyle = css`
  cursor: pointer;
  align-self: flex-end;
`;

export const Moderate = (props) => {
  return (
    <div className={`fizz-moderate ${moderateStyle}`} onClick={props.onClick} style={{ color: '#2185d0' }}>
      {props.children}
    </div>
  );
};

const translateStyle = css`
  cursor: pointer;
  align-self: flex-end;
`;
export const Translate = (props) => {
  return (
    <div className={`fizz-translate ${translateStyle}`} onClick={props.onClick} style={{ color: `${props.showOriginal ? 'grey' : '#21ba45'}` }}>
      {props.children}
    </div>
  );
};

const messageNickStyle = css`
  font-weight: bold;
`
export const MessageNick = (props) => {
  return (
    <div className={`fizz-message-nick ${messageNickStyle}`} style={{ fontWeight: 'bold', color: `${props.color}`, display: `${props.show ? 'block' : 'none'}` }}>
      {props.children}
    </div>
  );
};

const messageBodyStyle = css`
  font-size: 14px;
`
export const MessageBody = (props) => {
  return (
    <div className={`fizz-message-body ${messageBodyStyle}`}>
      {props.children}
    </div>
  );
};