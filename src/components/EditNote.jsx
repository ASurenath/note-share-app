import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./Quill/EditorToolbar";
import { editNoteApi } from '../apiServices/allApis';
import { noteUpdateContext } from '../Context/ContextShare';
import { toast } from 'react-toastify';

const style = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(500px,100%)',
    bgcolor: 'background.paper',
    border: 'none', //'2px solid #000',
    borderRadius: '5px',
    // boxShadow: 24,
    p: 5,
    py: 2,
};
function EditNote({ note }) {
    const { noteUpdate, setNoteUpdate } = useContext(noteUpdateContext)
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(note.title)
    const [value, setValue] = useState(note.content);
    const [saved, setSaved] = useState(value)


    const handleClose = () => {
        setNoteUpdate(!noteUpdate)
        setShow(false)

    }
    const handleOpen = () => {
        setShow(true)
        setTitle(note.title)
        setValue(note.content)
    }
    const handleSave = async () => {
        document.getElementById('save-button').innerHTML="<i class='fa-solid fa-spinner fa-spin-pulse'></i>"
        if (title) {
            const token = sessionStorage.getItem('token')
            try {
                const reqHeader = {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editNoteApi({ _id: note['_id'], content: value, title }, reqHeader)
                if (result.status == 200) {
                    // console.log(result.data);
                    console.log("successfully saved");
                    setSaved(value)
                    
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            toast.warning("Title can not be empty")
            document.getElementById('notetitle').value = note.title
        }
        document.getElementById('save-button').innerHTML="Save"

    }
    return (
        <>
            <Button onClick={handleOpen} variant='success' className='normal-bold rounded-4'>&nbsp;&nbsp;Edit&nbsp;&nbsp; <br /> <i className="fa-solid fa-pen"></i> </Button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header className='d-flex'>
                    <Modal.Title id="example-custom-modal-styling-title ">
                        {/* <label htmlFor="notetitle"><i className='fa-solid fa-pen text-secondary'/></label>&nbsp; */}
                        <input value={title} onChange={e => setTitle(e.target.value)} onBlur={handleSave} className='note-title' id='notetitle' />
                    </Modal.Title>
                    <p className='ms-auto'></p>
                    <p className='ms-auto'></p>
                    <p className='ms-auto'></p>
                    <Button disabled={(value == saved)} onClick={handleSave} id='save-button' variant='success' className='ms-auto'>Save</Button>
                    <Button onClick={handleClose} variant='primary' className='ms-4'><i className="fa-solid fa-xmark" /></Button>

                </Modal.Header>
                <Modal.Body>
                    <EditorToolbar />
                    <ReactQuill theme="snow"
                        value={value}
                        onChange={e => setValue(e)}
                        style={{ height: '65vh', backgroundColor: 'white' }}
                        modules={modules}
                        formats={formats} 
                        />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default EditNote;