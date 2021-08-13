import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { auth } from './firebase';

const firestore = firebase.firestore();


function App() {

  const messagesRef = firestore.collection("messages");
  const [value, setValue] = useState("");

  async function AddMessage(e) {
    e.preventDefault();
    console.log('a');
    
      await messagesRef.add({
        text: value
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={AddMessage}>
          <label>
            Your Message: &nbsp;
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
          </label>
          <input type="submit" name='Submit'/>
        </form>
      </header>
    </div>
  );
}

export default App;
