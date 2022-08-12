import {useState, useEffect, useRef} from "react";
import Items from "./components/Items";
import itemFamily from "./recoil/itemFamily";
import socketIOClient from "socket.io-client";
import {RecoilRoot, useSetRecoilState} from 'recoil'
import './App.css';
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [serverData, setServerData] = useState();
  const socket = socketIOClient(ENDPOINT);
  const { hookFunction } = updateHook();
  const hookFunctionRef = useRef(hookFunction);

  useEffect(() => {
    socket.on("FromJSON", data => {
      setServerData(data);
      if(serverData.id < 1 || serverData > 10){
        //error message
      }
      else{
        hookFunctionRef.current()
      }
      
    });

    return () => socket.disconnect();
  },[]);

  function updateHook(){
    const setWord = useSetRecoilState(itemFamily(serverData.id));
    setWord(serverData.word);
  }

  return (
    <RecoilRoot>
    <div className="App">
      <h2>This is a simple list with 2 columns</h2>
      <button onClick={() => socket.emit("requestJSON", 1)}>Get JSON Request</button>
      {[1,2,3,4,5,6,7,8,9,10].map((id) => {
        return (
          <div key={id}>
            <Items id={id}/>
          </div>
        );
      })}
      <p>
        It's <time dateTime={serverData}>{serverData}</time>
      </p>
    </div>
    </RecoilRoot>
  );
}

export default App;
