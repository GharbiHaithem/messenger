import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import Conversation from '../../component/Conversation';
import InputWithIcon from '../../component/InputWithIcon '
import { chats as fnchats, createChat } from '../../features/chatSlice';
import PropTypes from 'prop-types';
import { allMessages } from '../../features/messageSlice';
import { useDispatch, useSelector } from "react-redux";
import { messages as fnmessages } from "../../features/messageSlice";
import { BiArrowBack } from "react-icons/bi";
import { allusers, logOut } from '../../features/AuthSlices';
import './stye.css'
import { RxAvatar } from "react-icons/rx";
const Nav = ({back}) => {
    
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
    <>
         <div className="sm:w-[90%] w-full h-[70px] mx-auto flex justify-between items-center shadow-lg gap-[20px]  ">
                <span className='w-[20%] mx-4 hidden sm:block'> Discussion</span>
           {back && <span className='mx-3 cursor-pointer' onClick={()=>{navigate('/chat')}}><BiArrowBack /></span>}
                <div className='w-[50%] relative mx-[15px]'> <InputWithIcon name='searchQuery' onChange={handleSearch} icon={IoSearchOutline} placeholder="Rechercher" />
              
          {query && query?.length>0  &&    <div  className='absolute z-50 p-1 w-full h-[max-content] bg-blue-700  text-white top-[40px] left-0 cursor-pointer'  >
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
                </div>}
                </div>
                <div className="dropdown mr-[10px] w-[55px] h-[55px] rounded-full ">
  <button className="text-dark dropdown-toggle  w-full h-full" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  {user?.images?.length>0 ?   <span className='rounded-full   overflow-hidden'><img src={user?.images[0]?.url}  alt='img' className=' w-full h-full object-cover rounded-full' /></span> : <RxAvatar style={{fontSize:"50px"}} className='fs-1' />}
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <Link to={`/profil/${user?._id}`}><a className="dropdown-item" href="#">Edit profil</a></Link>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <Link  onClick={() => {
              navigate('/')
              dispatch(logOut())
            }}><a className="dropdown-item" href="#">Logout</a></Link>
  </ul>
</div>
            </div>
    </>
  )
}
Nav.propTypes = {
    back: PropTypes.bool.isRequired,
   
  };
export default Nav