import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack, IoMdSettings } from "react-icons/io";
import './style.css'
import { IoSend } from "react-icons/io5";
import InputEmoji from 'react-input-emoji'
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createmessage, messages as fnmsg } from "../../features/messageSlice";
import moment from "moment"
import { chats as fnchats } from '../../features/chatSlice';
import PropTypes from 'prop-types';
import CircleLoader from "react-spinners/CircleLoader";
import { IoMdCall } from "react-icons/io";
import Peer from "simple-peer"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/TextField"
import AssignmentIcon from "@material-ui/icons/Assignment"
import PhoneIcon from "@material-ui/icons/Phone"
import { CopyToClipboard } from "react-copy-to-clipboard"
const Message = ({ socket }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [receivingCall, setReceivingCall] = useState(false)
  const [stateCall, setStateCall] = useState(false)
  const [userChatCurrent, setUserChatCurrent] = useState({})
  const [receiveId, setReceiveId] = useState(null)
  const { messages } = useSelector(state => state?.message)
  const { user } = useSelector(state => state?.auth)
  const [me, setMe] = useState("")
  const [stream, setStream] = useState()

  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  useEffect(() => {
    if (receiveId) {
      socket?.current?.emit('receiveSocket', { me: user?._id, targetid: receiveId })
    }


  }, [socket, user?._id, receiveId])
  useEffect(() => {
    socket.current.on("sendSocket", data => {
      console.log(data)
      setMe(data.me.socketId)
      setIdToCall(data.other.socketId)
    })
  }, [socket])

  console.log(receiveId)




  console.log(me)
  console.log(idToCall)

  useEffect(() => {
if(stateCall){
  // Obtenir le flux vidéo et audio de l'utilisateur
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then((mediaStream) => {
    // Définir le flux dans l'état
    setStream(mediaStream);
    // Affecter le flux à l'élément vidéo
    if (myVideo.current) {
      console.log(myVideo.current)
      myVideo.current.srcObject = mediaStream;
    }
  })
  .catch((error) => {
    console.error("Erreur lors de l'obtention du flux média :", error);
  });

// Écouter l'événement "callUser" pour recevoir les appels
if (socket?.current) {
  console.log('ssssss')
  socket?.current.on("callUser", (data) => {
    setReceivingCall(true);
    setCaller(data.from);
    setCallerSignal(data.signal);
  });
}
}

  

  }, [socket, receivingCall,stateCall]);
  console.log(stream)
 
useEffect(()=>{
  console.log(stateCall)
  console.log(stream)
  console.log(me)
  console.log(receiveId)
  
  if(stateCall && stream){
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })
    console.log('eeeeeee')
  
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: receiveId,
        signalData: data,
        from: me,
        
      })
    })
    peer.on("stream", (stream) => {
      
        userVideo.current.srcObject = stream
      
    })
    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
  
    connectionRef.current = peer
  }
 
},[stateCall,socket,stream,me,receiveId])

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    })
    console.log(peer)
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }

  const { allMychats, chats, isLoading } = useSelector(state => state?.chat)
  useEffect(() => {
    const filterData = allMychats?.length > 0 && allMychats?.filter((x) => x?._id === id)
    setUserChatCurrent(filterData[0]?.members[0]?.senderId?._id !== user?._id ? filterData[0]?.members[0]?.senderId : filterData[0]?.members[0]?.receivedId)

    filterData[0]?.members[0]?.senderId._id !== user._id ? setReceiveId(filterData[0]?.members[0]?.senderId._id) :


      setReceiveId((filterData[0]?.members[0]?.senderId?._id !== user?._id ? filterData[0]?.members[0]?.senderId._id : filterData[0]?.members[0]?.receivedId?._id))


  }, [allMychats, user?._id, id])

  useEffect(() => {
    dispatch(fnchats())
  }, [chats, dispatch])
  const [newMessage, setNewMessage] = useState('')
  const handleChange = (msg) => {
    setNewMessage(msg)
  }
  const handleSend = () => {
    const data = {
      chatId: id,
      text: newMessage,
      senderId: user?._id
    }
    dispatch(createmessage(data))
    socket?.current?.emit('sendMessage', { receiveId, data });

    setTimeout(() => {
      dispatch(fnmsg(id))
    }, 2000)


    setNewMessage("")


  }

  useEffect(() => {
    dispatch(fnmsg(id))
  }, [dispatch, id])
  const scroll = useRef();

  const containerRef = useRef(null);

  // Utiliser useEffect pour faire défiler vers le bas lors de l'ouverture de la page

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  useEffect(() => {
    socket?.current?.on('getMessage', (data) => {
      console.log(data)
      setTimeout(() => {
        dispatch(fnmsg(id))
      }, 2000)


      // Mettre à jour les messages lorsqu'un nouveau message est reçu
    });
  }, [socket, dispatch, id])

  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current && messages.length > 0) {
        const children = containerRef.current.children;
        const lastChild = children[children.length - 1];
        lastChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }
    }, 3300);
  }, [messages]);

  return (
    <div className=" w-full  md:w-[70%] mx-auto">
      <div className="flex justify-between gap-[10px] items-center w-full  p-[10px] fixed top-0 left-0  bg-white shadow-lg">
        <div className="flex items-center gap-7">
          <IoIosArrowRoundBack onClick={() => navigate('/chat')} className="text-xl" />
          <div className="flex items-center"><Avatar />
            <span>{userChatCurrent?.firstname + " " + userChatCurrent?.lastname}</span></div>
        </div>
        {!stateCall && <IoMdCall onClick={() => {
         
          setStateCall(true)
        }} style={{ fontSize: "25px", cursor: "pointer" }} />}
      </div>
      {!stateCall ? <>






        <div ref={containerRef} className={`flex flex-col gap-1 mt-[60px] w-[90%] h-[500px] overflow-y-scroll   mx-auto `}>
          {
            isLoading ? <div className="w-full h-full flex items-center justify-center bg-transparent backdrop-blur-sm">
              <CircleLoader color="#36d7b7" />
            </div>


              :
              messages?.length > 0 && messages?.map((msg) => (
                <>
                  <div key={msg?._id} ref={scroll} className={`flex ${msg?.senderId === user?._id ? 'sg' : ''}  mt-3 rounded-lg ${msg?.senderId === user?._id ? 'bg-blue-400 text-white' : 'bg-stone-200'} gap-3 p-[10px] w-[60%]  md:w-[50%]`}>

                    <div className="flex flex-col gap-[20px]">
                      <span className="text-xs  ">{msg?.text}</span>
                      <span className={` font-extralight    self-end text-xs ${msg?.senderId === user?._id ? 'text-white' : 'text-gray-500'} `}>{moment(msg?.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </>
              ))
          }




        </div>
        <div className="flex items-center gap-[30px] w-[100%] mt-5">

          <InputEmoji
            onChange={handleChange}
            name="message"
            value={newMessage}
          />


          <div className="w-[10%]"><IoSend className="text-blue-600 text-2xl" onClick={handleSend} /></div>
        </div>
      </> : (
        <>
        <h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
          </div>
          <div className="video">
            {callAccepted && !callEnded ?
            <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
            null}
          </div>
        </div>
        <div className="myId">
         
          <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
            <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
              Copy ID
            </Button>
          </CopyToClipboard>
  
          <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
           ''
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
              <div className="caller">
              <h1 >{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      </>
      )}


    </div>
  )
}
Message.propTypes = {
  socket: PropTypes.object.isRequired,


};
export default Message