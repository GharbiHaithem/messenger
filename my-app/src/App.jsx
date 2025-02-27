
import './App.css'
import Chat from './page/Chat'
import Login from './page/Login'
import Message from './page/Message'
import{BrowserRouter, Routes ,Route} from 'react-router-dom'
import Signup from './page/Signup'
import{io} from 'socket.io-client'
import { PrivateRoute } from './routes/privateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { allusers } from './features/AuthSlices'
import Profil from './component/Profil'
import ModalCall from './page/ModalCall'

function App() {
  const dispatch = useDispatch()
const[call,setCall]=useState(false)
const socket = useRef(io("https://messenger-ncv2.onrender.com", {
    transports: ["websocket", "polling"],
    withCredentials: true
}));

useEffect(() => {
    socket.current.on("connect", () => {
        console.log("✅ Connecté au serveur WebSocket !");
    });

    socket.current.on("connect_error", (err) => {
        console.error("❌ Erreur WebSocket :", err);
    });
}, []);


  const {user,users} = useSelector(state=>state?.auth)
  const[userOnline,setUserOnline] = useState([])






  useEffect(() => {
    
    socket?.current?.emit("adduser", user?._id);
    
   
    socket?.current?.on("getuser",user=>{
      console.log(user)
      setUserOnline(user)
    }) 
   }, [socket,user?._id]);
   useEffect(()=>{
    dispatch(allusers())
  },[dispatch])


  return (
    <div className=''>
   <BrowserRouter>
  <Routes>
  <Route exact path='/' element={<Login socket={socket}/>} />  
  <Route  path='/signup' element={<Signup/>} />  
  

  <Route    path='/chat' element={  
       <PrivateRoute>
    <Chat  userOnline={userOnline} _users={users} />
    </PrivateRoute>
     }  />
  <Route    path='/message/:id' element={<Message  socket={socket}   />}  />
  <Route  path='/profil/:id' element={<Profil/>} />
  </Routes>
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
   </BrowserRouter>
 
    </div>
  )
}

export default App
