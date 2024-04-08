
import InputWithIcon from '../../component/InputWithIcon '
import './style.css'
import { IoSearchOutline } from "react-icons/io5";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allusers } from '../../features/AuthSlices';
import Conversation from '../../component/Conversation';
import { chats as fnchats, createChat } from '../../features/chatSlice';
import { useNavigate } from 'react-router';
import { messages as fnmessages,allMessages } from "../../features/messageSlice";
import TextChat from '../../component/TextChat';
import PropTypes from 'prop-types';
import Avatar from '../../component/Conversation/Avatar';

const Chat = ({_users,userOnline}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[query,setQuery] = useState()
    const handleSearch = (e) => {
        setQuery(e.target.value);
    }
const[userData,setUserDate] = useState([])
   
   const {users,user}  =useSelector(state=>state?.auth)

   useEffect(() => {

        if(query?.length>0)
     {   dispatch(allusers(query));
    setUserDate(users)
    }else{
        setUserDate([])
    }
  
}, [query, dispatch]);

const {allMychats,chats}  =useSelector(state=>state?.chat)
const {messages}  =useSelector(state=>state?.message)
useEffect(()=>{
    dispatch(fnchats())
},[chats,dispatch])


useEffect(() => {
   allMychats?.length>0 && allMychats?.map((chat) => {
        const members = chat.members[0];

        // Si senderId est différent de l'ID de l'utilisateur, retournez senderId, sinon returned receivedId
        return members.senderId !== user?._id ? members.senderId : members.receivedId;
    });

 
  
}, [allMychats,chats,user?._id]);
const handleChatClick = (chatId) => {
    // Dispatch your action here using the chatId
   

    // You can navigate or perform other actions here as well
    navigate(`/message/${chatId}`);
  };
  useEffect(()=>{
    for(let i ; i< allMychats?.length ; i++){
      
        dispatch(fnmessages(allMychats[i]._id))
    }
  },[allMychats,dispatch])
  useEffect(()=>{
    dispatch(allMessages())
  },[])
  let usersChatSet = new Set();
 const[myListChat,setMyListChat]=useState([])
  useEffect(() => {
    allMychats?.length>0 && allMychats?.forEach((members) => {
      const otherUser = 
        members?.members[0]?.senderId?._id !== user?._id
          ? members?.members[0]?.senderId
          : members?.members[0]?.receivedId;
          const chatId = members?._id; // Ajoutez cette ligne pour obtenir le chatId

          // Ajouter l'objet utilisateur avec le chatId à l'ensemble pour garantir l'unicité
          usersChatSet.add({ user: otherUser, chatId });
      // Ajouter l'objet utilisateur à l'ensemble pour garantir l'unicité
     
    });
  
    // Convertir l'ensemble en tableau si nécessaire
    const usersChat = Array.from(usersChatSet);
    setMyListChat(usersChat)
   
  }, [allMychats]);
  
   

    return (
        <div className='"w-[90%] flex flex-col  mx-auto'>
            <div className="sm:w-[90%] w-full h-[70px] mx-auto flex justify-between items-center shadow-lg gap-[20px]  ">
                <span className='w-[20%] mx-4 hidden sm:block'> Discussion</span>
            
                <div className='w-[70%] relative'> <InputWithIcon name='searchQuery' onChange={handleSearch} icon={IoSearchOutline} placeholder="Rechercher" />
              
                <div  className='absolute z-50 p-1 w-full h-[max-content] bg-transparent top-[40px] left-0 cursor-pointer'  >
{userData && userData?.map((_user)=>(
   <>

    <div key={_user?._id} onClick={()=>{
     
        dispatch(createChat({senderId:_user?._id,receivedId:user?._id}))
        dispatch(fnchats())
        setQuery("")
        }}>
            
 <Conversation   user={_user} /> 
 
    </div>
   </>
 
))}
                </div>
                </div>
                <div className="dropdown mr-[10px] w-[20%]">
  <button className="text-dark dropdown-toggle  " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
            </div>

            <div className='flex flex-row  gap-2 mt-[20px]  p-3 scroll-container overflow-x-scroll w-[90%]   mx-auto'>
              {
               _users?.length>0 && _users?.map((_user)=>(
                  <Avatar _users={_user?._id} userOnline={userOnline} key={_user?._id} fullname={_user?.firstname[0] + "-" +_user?.lastname[0]} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                ))
              }
               
            </div>
            <div className='flex flex-col gap-10 mt-[50px] overflow-y-scroll h-[700px] w-[90%] mb-[50px]  mx-auto'>
           
           {
            myListChat && myListChat?.map((c,index)=>(
              <>
              
                <div key={c?.user?._id} className='w-[100%] flex flex-wrap gap-[25px]'onClick={() => handleChatClick(c?.chatId)}>
                <Avatar   _users={c?.user?._id} userOnline={userOnline} fullname={c?.user?.firstname[0]+"-"+c?.user?.lastname[0]} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <div className='flex flex-col  w-[70%]'>
                    <span className='font-semibold'>{c?.user?.firstname + " " + c?.user?.lastname}</span>
                    <TextChat key={c?.user?._id} index={index} c={messages?.filter((x)=>x?.chatId?._id === c?.chatId)} />
                
               
              
                </div>
             </div>
              </>
            ))
           }
          
            
           
            </div>
        </div>
    )
}
Chat.propTypes = {
  _users: PropTypes.array.isRequired,
  userOnline: PropTypes.array.isRequired,
};
export default Chat