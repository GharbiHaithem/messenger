import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import './style.css'
import { IoSend } from "react-icons/io5";
import InputEmoji from 'react-input-emoji'
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createmessage, messages  as fnmsg} from "../../features/messageSlice";
import moment from "moment"
import { chats as fnchats } from '../../features/chatSlice';
import PropTypes from 'prop-types';
import CircleLoader from "react-spinners/CircleLoader";

const Message = ({socket}) => {
  const {id}= useParams()
  const navigate= useNavigate()
  const dispatch = useDispatch()

  
   const[userChatCurrent,setUserChatCurrent]=useState({})
   const[receiveId,setReceiveId]=useState(null)
   const{messages} =useSelector(state=>state?.message)
   const{user} =useSelector(state=>state?.auth)
   const {allMychats,chats,isLoading}  =useSelector(state=>state?.chat)
   useEffect(()=>{
const filterData =allMychats?.length>0 && allMychats?.filter((x)=>x?._id === id)
setUserChatCurrent(filterData[0]?.members[0]?.senderId?._id !==user?._id ? filterData[0]?.members[0]?.senderId : filterData[0]?.members[0]?.receivedId ) 

filterData[0]?.members[0]?.senderId._id !== user._id ? setReceiveId(filterData[0]?.members[0]?.senderId._id) :

 
  setReceiveId((filterData[0]?.members[0]?.senderId?._id !== user?._id ? filterData[0]?.members[0]?.senderId._id :  filterData[0]?.members[0]?.receivedId?._id ))


   },[allMychats,user?._id,id])

useEffect(()=>{
    dispatch(fnchats())
},[chats,dispatch])
const[newMessage,setNewMessage]=useState('')
const handleChange=(msg)=>{
  setNewMessage(msg)
}
const handleSend =()=>{
  const data ={
    chatId: id,
    text:newMessage,
    senderId:user?._id
  }
  dispatch(createmessage(data))
  socket?.current?.emit('sendMessage',{ receiveId, data});
 
  setTimeout(()=>{
    dispatch(fnmsg(id))
  },2000)

 
  setNewMessage("")


}

useEffect(()=>{
  dispatch(fnmsg(id))
},[dispatch,id])
const scroll = useRef();

const containerRef = useRef(null);

// Utiliser useEffect pour faire défiler vers le bas lors de l'ouverture de la page

useEffect(()=> {
  scroll?.current?.scrollIntoView({ behavior: "smooth" });
},[messages])

useEffect(() => {
  socket?.current?.on('getMessage', (data) => {
    console.log(data)
  setTimeout(()=>{
    dispatch(fnmsg(id))
  },2000)
  
     
    // Mettre à jour les messages lorsqu'un nouveau message est reçu
  });
}, [socket,dispatch,id])

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
    <div className=" w-[70%] mx-auto">
<div className="flex items-center p-[10px] gap-[10px] shadow-lg">
<IoIosArrowRoundBack onClick={()=>navigate('/chat')} className="text-xl" />
<Avatar/>
<span>{userChatCurrent?.firstname + " "+ userChatCurrent?.lastname}</span>
</div>

<div  ref={containerRef} className={`flex flex-col gap-1 w-[90%] h-[500px] overflow-y-scroll p-6  mx-auto `}>
{
  isLoading ? <div className="w-full h-full flex items-center justify-center bg-transparent backdrop-blur-sm">
    <CircleLoader color="#36d7b7" />
  </div>


  :
  messages?.length>0 && messages?.map((msg)=>(
<>
<div key={msg?._id}   ref={scroll}  className={`flex ${msg?.senderId===user?._id ? 'sg' : ''}  mt-3 rounded-lg ${msg?.senderId===user?._id ? 'bg-blue-400 text-white': 'bg-stone-200' } gap-3 p-[10px] w-[60%]  md:w-[50%]`}>
 {msg?.senderId !== user?._id &&   <Avatar/>}
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
    </div>
  )
}
Message.propTypes = {
  socket: PropTypes.object.isRequired,

};
export default Message