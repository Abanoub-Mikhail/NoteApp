import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Fade } from 'react-awesome-reveal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Notes({allNotes , notesDelete , notesGet}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [loading , setLoading] = useState(false);



  const formik = useFormik({
    initialValues : {
      title : allNotes.title,
      content :allNotes.content,
    },

    onSubmit: updateNote
  })

  async function updateNote(values) {
    setLoading(true)
    let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${allNotes._id}`, values , {
      headers : {
        token : `3b8ny__${localStorage.getItem('userToken')}`
      }
    }).catch((err)=> err)
      notesGet()
      handleClose()
      setLoading(false)
  }

  return (
    <>

    <div className="col-md-6">
      <Fade>

      <div className="note bg-note border p-3 rounded-3">
            <h3 className=' text-center border-bottom pb-3 text-warning fw-bold'>{allNotes.title}</h3>
            <p className=' py-2 fs-5 wrapper text-break'>{allNotes.content}</p>
            <div className="btn d-flex align-items-center justify-content-end p-0">
            <div className="btn btn-warning icon mx-2 p-3" onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></div>
            <div className="icon btn btn-danger p-3"  onClick={()=>notesDelete(allNotes._id)}><i className="fa-solid fa-trash-can"></i></div>
            </div>
          </div>
      </Fade>
          
        </div>


        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" className=' form-control mb-3' defaultValue={allNotes.title} id='title' name='title' placeholder='Title'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <textarea name="content" id="content" cols="30" defaultValue={allNotes.content} rows="10" placeholder='Content' className=' form-control'  onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={formik.handleSubmit} disabled={!(formik.values.title && formik.values.content)}>
          {loading ? <i className='fa fa-spinner fa-spin'></i> : "Update Note"}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

