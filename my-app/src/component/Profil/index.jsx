import { useEffect, useState } from "react";
import Nav from "../../page/Nav"
import './stye.css'
import { BsUpload } from "react-icons/bs";
import {useSelector,useDispatch} from 'react-redux'
import { upload } from "../../features/uploadSlice";
import { FaUserEdit } from "react-icons/fa";
import { getuser, updatesimpleuser } from "../../features/AuthSlices";
const Profil = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
   const{user} = useSelector(state=>state?.auth)
   const  dispatch = useDispatch()
    // Fonction pour gérer la sélection de l'image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            dispatch(upload(file))
            setUploadedImageUrl(URL.createObjectURL(file)); // Crée l'URL de l'image sélectionnée
        }
    };
    const [firstname,setFirstname] = useState(user.firstname)
    const [lastname,setLastname] = useState(user.lastname)
    const [address,setAddress] = useState(user.address)
    const [email,setEmail] = useState(user.email)
    const [img,setImg]=useState({
        url:user?.images?.length>0 ? user?.images[0]?.url : null,
        public_id:user?.images?.length>0 ? user?.images[0]?.public_id: null
    })
    const{images,isSuccess,isLoading} = useSelector(state=>state?.upload)
    useEffect(()=>{
     if(isSuccess){
        setImg((prev)=>({
            ...prev,
            url:images?.url,
            public_id:images?.public_id
        }))
    
     }
    },[images?.url,images?.public_id])
    console.log(img)
    const[edit,setEdit]= useState({
        firstname:false,
        lastname:false,
        email:false,
        address:false
    })
    const handleUpdate =(e)=>{
        e.preventDefault()
        dispatch(updatesimpleuser({images:img,firstname,lastname,email,address}))
        
        setTimeout(()=>{
dispatch(getuser(user?._id))
        },200)
        setEdit(prevEdit => ({
            ...prevEdit, // Gardez les autres propriétés inchangées
            firstname: false ,
            lastname:false,
            address:false,
            email:false
        }))
    }
  return (
    <>
    <Nav back={true} />
   <div className='w-[70%] mx-auto '>
        <div className='flex items-center justify-center   mt-[50px] '>
       
           <div className="w-[150px]  overflow-hidden h-[150px] border-1 border-slate-400 rounded-full relative c">
            <span  className="hidden absolute top-[50%] right-[-10px] cc">

            <BsUpload style={{fontWeight:900,fontSize:"30px"}} className="fs-2" />
            </span>
            <span className="azz absolute"></span>
            <input className="absolute top-[45%] z-40 h-[111px] opacity-0"type="file" accept="image/*" onChange={handleImageChange} />

          { user?.images?.length> 0 && uploadedImageUrl==null ? <img className="object-cover"  src={user?.images[0]?.url } alt='ig' /> :  <img className="object-cover"  src={ uploadedImageUrl} alt='ig' />  } 
           </div>
       
        </div>
       <div className="flex flex-col gap-4 justify-center  aa ">
     <div className="flex justify-between items-center aaa">
   {edit.firstname ? <input className="form-control" type="text" placeholder="firstname ..." name="firstname" onChange={(e)=>setFirstname(e.target.value)} value={firstname} /> : <span >{user?.firstname}</span>}  
     
     <span className="f" onClick={() => setEdit(prevEdit => ({
    ...prevEdit, // Gardez les autres propriétés inchangées
    firstname: true ,
    lastname:false,
    address:false,
    email:false
}))}>
    <FaUserEdit />
</span>

     </div>
      <div  className="flex justify-between items-center aaa">
      {edit.lastname ? <input  name="lastname" onChange={(e)=>setLastname(e.target.value)} className="form-control" type="text" placeholder="lastname ..." value={lastname}  /> :  <span >{user?.lastname}</span>}
      <span className="l"  onClick={() => setEdit(prevEdit => ({
    ...prevEdit,
    firstname:false,
    address:false,
    email:false,
    lastname: true 
}))}><FaUserEdit /></span>
      </div>
      <div  className="flex justify-between items-center  aaa">
      {edit.address ? <textarea  className="form-control"  name="address" onChange={(e)=>setAddress(e.target.value)} placeholder="adress ..." value={address} /> :  <span >{user?.address}</span>}
        <span className="a"  onClick={() => setEdit(prevEdit => ({
    ...prevEdit,
    firstname:false,
    // Gardez les autres propriétés inchangées
    lastname: false,
    address:true,
    email:false
}))}><FaUserEdit /></span>
        </div>    
        <div  className="flex justify-between items-center aaa">
        {edit.email ? <input  name="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" type="text" placeholder="email ..." value={email} /> :   <span >{user?.email}</span>}
        <span className="e"  onClick={() => setEdit(prevEdit => ({
    ...prevEdit, // Gardez les autres propriétés inchangées
    firstname: false ,
    lastname:false,
    address:false,
    email:true
}))}><FaUserEdit /></span>
        </div>
       </div>
       <button disabled={isLoading ? true : false} className="mt-3 block mx-auto bg-slate-950 text-white p-[10px] rounded-sm " type="button" onClick={handleUpdate}>Edit info</button>
    </div>
   </>
    
  )
}

export default Profil