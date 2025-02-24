import { TbPassword } from "react-icons/tb";
import InputWithIcon from '../../component/InputWithIcon '
import './styles.css'
import { TfiEmail } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup'
import { useFormik } from "formik";
import { loginUser } from "../../features/AuthSlices";
import { useEffect } from "react";
import PropTypes from 'prop-types';
const Login = ({socket}) => {
  const navigate = useNavigate()
  const{user} =useSelector(state=>state?.auth)
  let loginSchema = yup.object().shape({
   
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    password:yup.string().required('password is required').min(4).max(20),
  
    
  }) 
  const dispatch =  useDispatch()
  const formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",
     
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(loginUser(values));
      formik.resetForm();
    }
  });
  const {isLogin}  = useSelector(state=>state?.auth)
  useEffect(()=>{
    if(isLogin ){
      socket?.current?.emit('adduser',user?._id)
  navigate('/chat')
    }
  },[navigate,isLogin])
  useEffect(() => {
    
    socket?.current?.emit("adduser", user?._id);

    socket?.current?.on("getuser",user=>{
      console.log(user)
     
    }) 
   }, [socket,user?._id]);
  return (
    <div className='md:w-[70%]  w-[100%] mx-auto h-[100vh]  bg-slate-50 md:bg-transparent '>
<div className="flex w-[90%]   mx-auto h-[400px]">
<form  onSubmit={formik.handleSubmit} className='flex items-start p-[30px] flex-col justify-center w-full md:w-[60%] md:rounded-l-2xl  rounded-r-none  bg-slate-50 gap-[10px]   mt-[100px]'>
    <InputWithIcon type={'text'} onChange={formik.handleChange('email')} name="email" value={formik.values.email} icon={TfiEmail} placeholder={'email ...'}/>
    {formik.touched.email && formik.errors.email && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.email}</span>}
    <InputWithIcon type={'text'} onChange={formik.handleChange('password')} name="password" value={formik.values.password} icon={TbPassword} placeholder={'Password ...'}/>
    {formik.touched.password && formik.errors.password && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.password}</span>}
    <button type="submit"  className="bg-orange-300 mx-auto md:mx-0 text-white  hover:border-1 border-red-800 p-2 rounded-lg text-sm">
  Se Connecter
</button>
    <div><span className="text-sm mt-[55px] text-stone-400">Create An Account? </span><Link to='/signup'>Registre</Link></div>
</form>
<div className="hidden mt-[100px] bg-gradient-to-b from-orange-300 to-pink-400 md:flex md:items-center md:justify-center md:w-[40%] rounded-r-2xl rounded-l-none">
  <span className="aaaaa text-white text-sm  md:text-lg lg:text-xl text-stroke">Glad to see you</span>
</div>


</div>
    </div>
  )
}
Login.propTypes = {
  socket: PropTypes.object.isRequired,

};
export default Login