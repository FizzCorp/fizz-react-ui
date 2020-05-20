import React from 'react';

export const ChannelContext = React.createContext({});

export function withChannelContext(OriginalComponent) {
  const ContextAdded = function ContextComponent(props) {
    return (
      <ChannelContext.Consumer>
        {(channelContext) => (
          <OriginalComponent {...channelContext} {...props} />
        )}
      </ChannelContext.Consumer>
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