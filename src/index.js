import { faPaperPlane, faLanguage, faTrashAlt, faUserSecret, faCheckCircle, faCheck, faExclamationCircle, faSync } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faPaperPlane, faLanguage, faTrashAlt, faUserSecret, faCheckCircle, faCheck, faExclamationCircle, faSync);


export { default as Channel } from './components/Channel';
export { default as Chat } from './components/Chat';
export { default as Input } from './components/Input';
export { default as Messages } from './components/Messages';