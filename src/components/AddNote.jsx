import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { addNoteApi } from '../apiServices/allApis';
import { noteUpdateContext } from '../Context/ContextShare';


function AddNote() {
  // //_______________________________________________________Hooks
  const {noteUpdate,setNoteUpdate}=useContext(noteUpdateContext)
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('')
  const [token,setToken]=useState('')
  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
  }, [])
  
  // //_______________________________________________________Functions
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setTitle('')
    setShow(false);
  }
  //////__________________________________________________________handle create note (with API call)
  const handleCreateNote = async () => {
    console.log("inside handleCreateNote");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    try {
      const result = await addNoteApi({ title, creationTime: Date.now() },reqHeader)
      if (result.status == 200) {
        alert(`New note '${title}' added successfully`)
        setNoteUpdate(!noteUpdate)
        handleClose()
      }
      else{
        console.log(result.response.data);
      }
    }
    catch (err) {
      console.log(err);
      alert('Something went wrong. Please try again later')
    }
  }
  return (
    <div>
      <Button variant='danger' className='mt-3 p-1 serif-bold' onClick={handleOpen}>
        <h5 className='serif-bold'><i className="fa-solid fa-plus"/> New&nbsp;note</h5>
      </Button>
      <Modal
        size='small'
        show={show}
        onHide={handleClose}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Create a new Note!
          </Modal.Title>
          <Button onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x' /></Button>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex px-5 pb-5'>
            <input type="text" className='form-control' placeholder='Title...' value={title} onChange={e => setTitle(e.target.value)} style={{borderRadius:'50px 0 0 50px'}}/>
            <Button onClick={handleCreateNote} disabled={!title} variant='success' style={{borderRadius:'0 50px 50px 0'}}>Create</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AddNote