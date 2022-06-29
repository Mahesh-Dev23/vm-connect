import React, { useEffect, useState } from "react";
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import JoinForm from "./components/views/JoinForm";
import Controls from "./components/views/Controls";
import getEventData from "./components/controllers/getEventData";
import { AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack, } from "agora-rtc-react";

const config = {mode: "rtc", codec: "vp8"}

const APP_ID = "2c30779ed004444299f517e3aa3ae1cf"
const roomId = "em-interview"
const token = "0062c30779ed004444299f517e3aa3ae1cfIAB8jFiN7ZIbXhtaQ10IAMR7QFNPwD7qdXM/Vd5i4tnq2bKm08MAAAAAEACuPHv62jO8YgEAAQDZM7xi"



const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const App =  () => {

  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  console.log("ready ", tracks)
  let uid
  const userNames = [ "mahesh", "salil", "vinit", "manoj", "Durgesh"]

  //const { setInCall, channelName } = props;
  const [localUser, setLocalUser] = useState()
  const [welcome, setWelcome] = useState('Please join with you credentials.')
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [controlVideo, setControlVideo] = useState('')
  const [eventData, setEventData] = useState()

  const url = "https://data.mongodb-api.com/app/data-tukjf/endpoint/data/v1"
  const API_Key = "62b03cf84efb9d0d16d94f2e"

  var data = JSON.stringify({
    "collection": "events",
    "database": "proagm",
    "dataSource": "Cluster0",
    
});

  var config = {
    method: 'get',
    url: 'https://data.mongodb-api.com/app/data-tukjf/endpoint/data/v1',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_Key,
    },
    data: data
};

  const getEventData = async () => {
    await axios( config )
    .then( res => setEventData( res.data ))
    .catch( err => console.log( "Error ", err ))
  }

  getEventData()

  let videoRow = userNames.length

  const videoRowLength = () => {
    if(!userNames) return videoRow = 1
    if( userNames.length > 2 ){
      videoRow = Math.round( userNames.length / 2 )
    }
    userNames.reverse()
  }

  videoRowLength()

  //const eventData = getEventData() 

  const joinedUser = (e) => setLocalUser(e)

  const controlEle = (e) => setControlVideo(e)

  //console.log("app ", eventData)

  useEffect(()=>{
    if(!localUser) return
    
    

    if(userNames.includes(localUser.name)){
      setWelcome(`Hi ${localUser.name}, welocme to Video Conferencing App.`)
      setStart(true)
    }else{
      setWelcome(`Hi ${localUser.name}, you are not registered for this Video Conferencing App.`)
    }
    console.log("40 ", localUser.name)

    if( localUser.name === userNames[0]){
        if (ready && tracks) {
          console.log("init ready");
          //joinAndDisplayLocalStream();
        }
    }
  },[localUser])

  useEffect(() => {
    console.log("controlVideo ", controlVideo)
    if( controlVideo === "video"){
      toggleCam()
    }

    if( controlVideo === "audio"){
      toggleMic()
    }

    if( controlVideo === "leave"){

    }

  },[controlVideo])

     // function to initialise the SDK
    let joinAndDisplayLocalStream = async () => {
      console.log("init", roomId);
      client.on("user-published", async (user, mediaType) => {
        let i = 1;
      

        //do{
          await client.subscribe(user, mediaType);
          console.log("subscribe success", i);
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return [...prevUsers, user];
            });
          }
          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        //   i++
        // }
        // while( i < userNames.length)
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      uid = await client.join(APP_ID, roomId, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      //setStart(true);

    };

    let toggleMic = async () => {
      //alert("change audio")
      if(tracks[0].muted){
          await tracks[0].setMuted(false)
          console.log("muted ", tracks[0]._muted)
      }else{
          await tracks[0].setMuted(true)
          //e.target.style.backgroundColor = "#ee4b2b"
          console.log("audio on ", tracks[0]._muted)
      }
  }
  
  let toggleCam = async () => {
    //alert("change video")
      if(tracks[1].muted){
          await tracks[1].setMuted(false)
          
      }else{
          await tracks[1].setMuted(true)
          
      }
  }

  // useEffect(() => {
 
  //   if (ready && tracks) {
  //     console.log("init ready");
  //     //joinAndDisplayLocalStream();
  //   }

  // }, [roomId, client, ready, tracks]);

  return (
    <div className="App">
      {/* { eventData ? <h1>{eventData}</h1> : null } */}
      {
        start ? 
          <>
            <div className="videoStream" style={{gridTemplateColumns:`repeat(${videoRow}, minmax(10px, 1fr))`}}>
            
              {ready ? 
              
              userNames.map( res =>
                <AgoraVideoPlayer 
                  className="agVideo" 
                  videoTrack={tracks[1]} 
                  key={res}
                  //style={{  width: '100%', aspectRatio: '16 / 9'}} 
                />
              )
                
                  
              
              : null}
            </div>
            <Controls 
              controlElem = {controlEle}
            />
          </>
          :
          <div className="joinCall">
            <p>{welcome}</p>
            <JoinForm 
              joinedUser = {joinedUser}
            />
          </div>
      }
        
        
      </div>
    
  );
}

export default App;
