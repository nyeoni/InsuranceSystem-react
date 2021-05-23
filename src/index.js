import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import rootReducer from "./redux/modules";

const store = createStore(rootReducer); // 스토어를 만듭니다.
console.log(store.getState()); // 스토어의 상태를 확인해봅시다.

ReactDOM.render(<App />, document.getElementById('root'));

// TODO : 나중에 서비스 워커 확인해보기 publish 할 때
