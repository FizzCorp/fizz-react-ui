import React from 'react';

export const ChatContext = React.createContext({});

export function withChatContext(OriginalComponent) {
  const ContextAdded = function ContextComponent(props) {
    return (
      <ChatContext.Consumer>
        {(chatContext) => (
          <OriginalComponent {...chatContext} {...props} />
        )}
      </ChatContext.Consumer>
    );
  };
  ContextAdded.displayName =
    OriginalComponent.displayName || OriginalComponent.name || 'Component';
  ContextAdded.displayName = ContextAdded.displayName.replace(
    'Base',
    '',
  );

  return ContextAdded;
}