import React, { useContext, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { deleteUserApi } from '../apiServices/allApis';
import { useNavigate } from 'react-router-dom';
import { loginStatusContext } from '../Context/ContextShare';
import { toast } from 'react-toastify';


function DeleteUser() {
  const { setLoginStatus} = useContext(loginStatusContext)
  const [show, setShow] = useState(false);
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setPassword('')
  }
  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token')
    const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const deleteToast=toast.loading("Please wait..")
    try {
        const result = await deleteUserApi({password}, reqHeader)
        if (result.status == 200) {
            toast.update(deleteToast, { render:`Account Deleted successfully`, type: "info", isLoading: false,autoClose:true });

            setLoginStatus(false)
            handleClose()
            navigate('/')
            sessionStorage.clear()
        }
        else if (result.response.status == 404) {
          toast.update(deleteToast, { render:result.response.data, type: "warning", isLoading: false,autoClose:true });

          
      }
    }
    catch (err) {
        console.log(err);
        toast.update(deleteToast, { render:'Something went wrong. Please try again later', type: "error", isLoading: false,autoClose:true });

    }
}
// // ______________________________________________________RETURN
  return (
    <div>
      <Button onClick={handleOpen} className='serif-bold'>Delete account</Button>

      <Modal
        size='small'
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header>
          <Modal.Title className='text-center' id="example-custom-modal">
            <p>Are you sure that you want to delete your account.</p>
            <p className='text-danger fw-bold fs-2'>Your notes will be deleted with your account!</p>
          </Modal.Title>
          <Button  onClick={handleClose} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
        </Modal.Header>
        <Modal.Body>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className='form-control mb-3 text-center' placeholder='Enter your password...'/>
          <div className='d-flex justify-content-evenly'>
          <Button onClick={handleClose} variant='success' className='serif-bold'>No,&nbsp;cancel</Button>
            <Button onClick={handleSubmit} variant='primary' className='serif-bold'>Yes,&nbsp;Please delete</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DeleteUser