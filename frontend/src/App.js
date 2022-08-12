import {useEffect} from "react";
import Items from "./components/Items";
import itemFamily from "./recoil/itemFamily";
import socketIOClient from "socket.io-client";
import {useRecoilCallback} from 'recoil'
import './App.css';
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  
  const updateWord = useRecoilCallback(({ set }) => async (newValue) => {
    set(itemFamily(newValue.id), newValue.word);
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromJSON", data => {
      let recieved = data;
      console.log("Got Message", typeof(recieved));
      if(recieved.id < 1 || recieved.id > 10){
        console.log("Should not happen");
      }
      else{
        updateWord(recieved);
      }
      
    });

    return () => socket.disconnect();
  },[updateWord]);

  return (
      <div className="App">
        <h2>This is a simple list with 2 columns</h2>
        {[1,2,3,4,5,6,7,8,9,10].map((id) => {
          return (
              <Items id={id}/>
          );
        })}
      </div>
  );
}

export default App;
