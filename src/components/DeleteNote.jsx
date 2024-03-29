import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteNoteApi } from '../apiServices/allApis';
import { noteUpdateContext } from '../Context/ContextShare';


function DeleteNote({ note }) {
  const {noteUpdate,setNoteUpdate}=useContext(noteUpdateContext)

  const [show, setShow] = useState(false);

  const handleDelete = async () => {
    document.getElementById('delete-button').innerHTML="<i class='fa-solid fa-spinner fa-spin-pulse'></i>"
    const token = sessionStorage.getItem('token')
    try {
        const reqHeader = {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteNoteApi({ _id: note['_id'] }, reqHeader)
        if (result.status == 200) {
            // console.log(result.data);
            console.log("successfully deleted");
            setNoteUpdate(!noteUpdate)
            handleClose()
        }
    }
    catch (err) {
        console.log(err);
    }
    document.getElementById('delete-button').innerHTML="Yes, please delete"

}
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  }
  // // ______________________________________________________RETURN

  return (
    <div>
      <Button onClick={handleOpen} variant='primary' className='normal-bold rounded-4'>
        Delete <br /><i className="fa-solid fa-trash"></i>
        </Button>

      <Modal
        size='small'
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title className='text-center' id="example-custom-modal">
            <p>Are you sure that you want to delete '{note?.title}'?</p>
            <p className='text-danger fw-bold fs-2'>This can't be undone!</p>
          </Modal.Title>
          <Button  onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-evenly'>
          <Button onClick={handleClose} variant='success'>No,&nbsp;cancel</Button>
            <Button onClick={handleDelete} id='delete-button' variant='primary'>Yes,&nbsp;Please delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeleteNote