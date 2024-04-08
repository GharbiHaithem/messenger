import InputWithIcon from "../../component/InputWithIcon "
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { TbPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import * as yup from 'yup'
import{useFormik} from 'formik'
import { useDispatch } from 'react-redux';
import { registreUser } from "../../features/AuthSlices";
const Signup = () => {
  let signupSchema = yup.object().shape({
    lastname:yup.string().required('lastname is required'),
    firstname:yup.string().required('firstname is required'),
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    password:yup.string().required('password is required').min(4).max(20),
    address:yup.string().required('adress is required'),
    phone:yup.number().required('mobile phone is required').min(6)
    
  }) 
  const dispatch =  useDispatch()
  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: '',
      email: "",
      password: "",
      address: "",
      phone: ""
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(registreUser(values));
      formik.resetForm();
    }
  });
  return (
    <div className='w-[80%] mx-auto h-[100vh]  bg-slate-50 md:bg-transparent flex justify-center items-center'>
    <div className="flex w-[90%] h-[max-content] shadow-2xl md:shadow-none">
      <form onSubmit={formik.handleSubmit} className='md:w-[70%] mx-auto block bg-slate-50 flex justify-center items-center'>
        <div className="flex items-center p-[10px] h-[400px] flex-col md:w-[60%] justify-center w-full md:rounded-l-2xl rounded-r-none gap-[10px]">
          <div className="flex gap-[20px]">
            <InputWithIcon type={'text'} name='firstname' value={formik.values.firstname} onChange={formik.handleChange('firstname')} icon={FaRegUser} placeholder={'Firstname ...'}/>
            {formik.touched.firstname && formik.errors.firstname && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.firstname}</span>}
            <InputWithIcon type={'text'} name='lastname' value={formik.values.lastname} onChange={formik.handleChange('lastname')} icon={FaRegUser} placeholder={'Lastname ...'}/>
            {formik.touched.lastname && formik.errors.lastname && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.lastname}</span>}
          </div>
          <InputWithIcon type={'text'} name='email' value={formik.values.email} onChange={formik.handleChange('email')} icon={TfiEmail} placeholder={'Email ...'}/>   
          {formik.touched.email && formik.errors.email && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.email}</span>}
          <InputWithIcon type={'password'}  name='password' value={formik.values.password} onChange={formik.handleChange('password')}  icon={TbPassword} placeholder={'Password ...'}/>
          {formik.touched.password && formik.errors.password && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.password}</span>}
          <InputWithIcon type={'number'} name='phone' value={formik.values.phone} onChange={formik.handleChange('phone')} icon={FaPhone} placeholder={'Mobile phone ...'}/>
          {formik.touched.phone && formik.errors.phone && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.phone}</span>}
          <textarea placeholder="Adresse" name="address"  value={formik.values.address} onChange={formik.handleChange('address')} className="w-full bg-slate-100"></textarea>
          {formik.touched.address && formik.errors.address && <span className="mt-2 p-[10px] inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">{formik.errors.address}</span>}
          <button type="submit" className="bg-orange-300 mx-0 placeholder:text-xs md:placeholder:text-lg w-full text-white hover:bg-white shadow-sm hover:text-orange-300 p-2 rounded-lg text-sm">
  Registre
</button>
          <div>
            <span className="text-sm mt-[55px] text-stone-400">Already Have An Account? </span>
            <Link to='/'>Login</Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-gradient-to-b from-orange-300 to-pink-400 md:flex md:items-center md:justify-center md:w-[40%] rounded-r-2xl rounded-l-none">
        <span className="aaaaa text-white text-stroke">Glad to see you</span>
      </div>
    </div>
  </div>
  
  )
}

export default Signup