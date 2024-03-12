import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/UserContext';
import img1 from '../../assets/image/sign in.webp'


export default function Signin() {

  const [loading , setLoading] = useState(false);
  let {setToken, signin} = useContext(userContext)
  const [error , setError] = useState('');
  let navigate = useNavigate();
  

  async function login(values) {
    setLoading(true)
    let {data} = await signin(values)
    .catch((error)=>{
    setLoading(false)
    setError(error.response.data.msg)
  })
    if (data.msg == 'done') {
      setToken(data.token)
      localStorage.setItem('noteToken' , data.token)
      navigate('/home')
    }
  }


  const validationSchema = Yup.object({
    email : Yup.string().email('* Invalid email address').required('* Email is Required'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,10}$/,"* invalid Password (start with Capitalize)").required("* password is Required"),
  });

  const formik = useFormik({
    initialValues:{
      email:'',
      password: '',
    },
    validationSchema,

    onSubmit:login
  })


  return (
    <>
    
    <section className='bg-sec-main form p-3 py-4 text-white mx-auto rounded-3'>
    <div className="img text-center"><img src={img1} width={200} alt="" /></div>
      <h2 className=' text-capitalize text-center mb-4 fw-bold'>signin</h2>
      <form onSubmit={formik.handleSubmit}>
      {error ? <div className='text-center text-danger mb-3 text-capitalize'> * {error}</div> : null}  
      <div className="form-floating mb-3">
        <input type="email" className="form-control" name='email' id="floatingEmail" placeholder="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="floatingEmail"  className=' text-black'>Email</label>
        {formik.errors.email && formik.touched.email ? (
          <p className='text-danger mt-1'>{formik.errors.email}</p>
        ):null} 
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" name='password' id="floatingPassword" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="floatingPassword"  className=' text-black'>Password</label>
        {formik.errors.password && formik.touched.password ? (
          <p className='text-danger mt-1'>{formik.errors.password}</p>
        ):null}
      </div>
      <button className='btn btn-primary w-100 fs-4 fw-bold' disabled={!(formik.isValid && formik.dirty)}>
      {loading ? <i className='fa fa-spinner fa-spin'></i> : "Register"}
        </button>
      </form>
          <p className=' text-capitalize mt-4'>don't have an account? <Link className=' text-warning ' to={'/register'}>register</Link></p>
    </section>
    
    </>
  ) 
}
