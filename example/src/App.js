import React from 'react'

import { Messages, Input, Chat, Channel  } from 'fizz-react-ui'

const APP_ID = "751326fc-305b-4aef-950a-074c9a21d461";
const APP_SECRET = "5c963d03-64e6-439a-b2a9-31db60dd0b34";

const App = () => {
  return (
  <Chat appId={APP_ID} appSecret={APP_SECRET} userId='ht' locale='en'>
    <Channel channelId='global-channel'>
      <Messages />
      <Input />
    </Channel>
  </Chat>
  )
}

export default App