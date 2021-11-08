import React from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react';
import { ListItem } from './components/ListItem';
import { SaveItem } from './components/SaveItem';

function App() {
  return (
    <div className="App">
      <SaveItem />
      <ListItem />
    </div>
  );
}

export default withAuthenticator(App, true);
