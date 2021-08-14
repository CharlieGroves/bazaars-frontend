import React, { useState } from "react";
import "./css/App.css";
import "firebase/firestore";
import { firestore } from './firebase';

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
