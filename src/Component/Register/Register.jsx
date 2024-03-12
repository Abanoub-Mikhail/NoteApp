import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/UserContext';
import img1 from '../../assets/image/sign in.webp'

export default function Register() {

  const [loading , setLoading] = useState(false);
  let {signUp , setUserName} = useContext(userContext)
  const [error , setError] = useState('');
  let navigate = useNavigate();
  

  async function register(values) {
    setLoading(true)
    let {data} = await signUp(values)
    .catch((error)=>{
    setLoading(false)
    setError(error.response.data.msg)
  })
    if (data.msg == 'done') {
      setUserName(data.user.name)
      navigate('/signin')
    }
  }


  const validationSchema = Yup.object({
    name : Yup.string().min(3,"* Name is too Short")
    .max(15, '* Name Must be 15 characters or less')
    .required('* Name is Required'),
    email : Yup.string().email('* Invalid email address').required('* Email is Required'),
    age :Yup.number().required('* Name is Required').positive('* Age is invalid').integer('* Age is invalid'),
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,10}$/,"* invalid Password (start with Capitalize)").required("* password is Required"),
    phone :Yup.string().matches(/^01[0125][0-9]{8}$/,"* invalid phone").required("* Phone is Required"),
  });

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password: '',
      age: '',
      phone:'',
    },
    validationSchema,

    onSubmit:register
  })


  return (
    <>
    
    <section className='bg-sec-main form p-3 text-white mx-auto rounded-3'>
      <div className="img text-center"><img src={img1} width={200} alt="" /></div>
      <h2 className=' text-capitalize text-center mb-4 fw-bold'>signUp</h2>
      <form onSubmit={formik.handleSubmit}>
      {error ? <div className='text-center text-danger mb-3 text-capitalize'> * {error}</div> : null}
      <div className="form-floating mb-3">
        <input type="text" className="form-control" name='name' id="floatingInput" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="floatingInput" className='text-black'>Name</label>
        {formik.errors.name && formik.touched.name ? (
          <p className='text-danger mt-1'>{formik.errors.name}</p>
        ):null}
      </div>  
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
      <div className="form-floating mb-3">
        <input type="number" className="form-control" name='age' id="floatingAge" placeholder="Age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="floatingAge"  className=' text-black'>Age</label>
        {formik.errors.age && formik.touched.age ? (
          <p className='text-danger mt-1'>{formik.errors.age}</p>
        ):null}
      </div>
      <div className="form-floating mb-4">
        <input type="text" className="form-control" name='phone' id="floatingPhone" placeholder="Phone Number" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <label htmlFor="floatingPhone"  className=' text-black'>Phone Number</label>
        {formik.errors.phone && formik.touched.phone ? (
          <p className='text-danger mt-1'>{formik.errors.phone}</p>
        ):null}
      </div>
      
      <button className='btn btn-primary w-100 fs-4 fw-bold' disabled={!(formik.isValid && formik.dirty)}>
      {loading ? <i className='fa fa-spinner fa-spin'></i> : "Register"}
        </button>
      </form>

    </section>
    
    </>
  ) 
}
