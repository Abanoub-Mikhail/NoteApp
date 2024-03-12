import React from 'react'
// import img1 from '../../assets/image/start.jpg'
import img2 from '../../assets/image/f2.png'
import { Link } from 'react-router-dom'

export default function Start() {
  return (
    <>
    <section className="bg-sec-main p-3 py-5 text-white mx-auto rounded-3">
      <div className="row revo gy-4">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="title ">
            <h1 className=' text-uppercase mb-3 py-2 madimi-one-regular text-warning'>toDo bot</h1>
            <p className=' text-capitalize my-4 h3 '>get started with todo bot today and take your productivity to the next level! <br/><span>so why wait?</span></p>
            <div className="row gy-3">
              <div className="col-md-6">
              <Link className='btn btn-primary w-100 text-capitalize' to={'/signin'}>login</Link>
              </div>
              <div className="col-md-6">
              <Link className=' btn btn-outline-primary w-100 text-capitalize text-white' to={'/register'}>signup</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="img w-75 ms-auto">
            <img src={img2} alt="start image" className='w-100 rounded-5' />
          </div>
        </div>
      </div>

    </section>
    </>
  )
}
