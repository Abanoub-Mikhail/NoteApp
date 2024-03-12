import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import Notes from '../Notes/Notes';
import img1 from '../../assets/image/no item.webp'

export default function Home() {
  // let {userName} = useContext(userContext)
  const [loading , setLoading] = useState(false);
  const [notes , setNotes] = useState([]);
  const [error , setError] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const formik = useFormik({
    initialValues : {
      title : '',
      content : '',
    },

    onSubmit: addNote
  })

  async function addNote(values) {
    setLoading(true)
    let {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes', values , {
      headers : {
        token : `3b8ny__${localStorage.getItem('noteToken')}`
      }
    }).catch((err)=> err)
    
    if (data.msg == "done") {
      handleClose()
      setLoading(false)
      getNotes();
    }
  }


  async function getNotes() {
    try {
      let { data } = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes', {
        headers: {
          token: `3b8ny__${localStorage.getItem('noteToken')}`
        }
      });
      if (data?.msg == "done") {
        // Check if the notes array is empty and set state accordingly
        if (data?.notes && data.notes.length > 0) {
          setNotes(data.notes);
        } else {
          // Handle the case where there are no notes
          setNotes([]);
        }
      }
    } catch (err) {
      setError(err?.response?.data?.msg);
    }
  }

  async function deleteNotes(id) {
    try {
      let { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem('noteToken')}`
        }
      });
      if (data?.msg == "done") {
        // Directly update the state to remove the deleted note
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (err) {
      // console.log(err);
      // Optionally, handle the error state here
    }
  }


  useEffect(()=>{
      getNotes();
  },[])



  return (
    <>
    
    <section className='p-3 py-4 text-white mx-auto rounded-3'>
      <h2 className=' text-center text-capitalize mb-4 h1 startNote border py-3 rounded-5'>note app😎</h2>
      <button className='addNotesDes btn btn-primary ms-auto d-block w-100 fw-bold mb-3'  variant="primary" onClick={handleShow}><i className="fa-solid fa-circle-plus"></i> Add Notes</button>
      <div className='addNotes'  variant="primary" onClick={handleShow}><i className="fa-solid fa-circle-plus"></i></div>
      {notes.length==0?
      <>
      <div className=' text-center'>
      <h3 className=' py-2 text-center text-capitalize respo '>to Add New Notes <br /> Click the Button Below ⤵</h3>
      <h3 className=' py-2 text-center text-capitalize respoB '>to Add New Notes <br /> Click the top Button ⤴</h3>
      <img className='notItem' src={img1} alt="no notes added" />
      </div>
      
      </>
      : null}
      <div className="row gy-3 mt-4">
        {notes?.map((note)=>{
          return <Notes  allNotes = {note} key={note._id} notesDelete={deleteNotes} notesGet = {getNotes} />
        })}
        
      </div>
    </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input type="text" className=' form-control mb-3' id='title' name='title' placeholder='Title' value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
            <textarea name="content" id="content" cols="30" rows="10" placeholder='Content' className=' form-control' value={formik.values.content} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={formik.handleSubmit} disabled={!(formik.values.title && formik.values.content)}>
          {loading ? <i className='fa fa-spinner fa-spin'></i> : "Add Note"}
          </Button>
        </Modal.Footer>
      </Modal>



    
    </>
  )
}
