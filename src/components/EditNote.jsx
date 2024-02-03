import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from "./Quill/EditorToolbar";



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
function EditNote({ data }) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(`<h1>Sample Text</h1>
    <p>Lorem ipsum dolor sit <b>amet consectetur</b> adipisicing elit.</p>
    <h2>Sub heading </h2>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur iste itaque dicta facere nihil, provident accusantium minima explicabo vero tempora voluptate rem magnam sunt, consequatur architecto fuga. Explicabo, cum dignissimos.
</p>
<ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
</ul>`);
    const [saved, setSaved] = useState(value)

    console.log('value',value);
    console.log('saved',saved);
    console.log(value==saved);
    const handleClose=()=>{
        setShow(false)
    }
    const handleOpen=()=>{
        setShow(true)
    }
    const handleSave=()=>{
        setSaved(value)
    }
    return (
        <>

            <Button onClick={handleOpen} variant='success' className='normal-bold rounded-4'>&nbsp;&nbsp;Edit&nbsp;&nbsp; <br /> <i className="fa-solid fa-pen"></i> </Button>

            <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-90w"
                // data-bs-theme='dark'
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header  className='d-flex'>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Note title
                    </Modal.Title>
                    <p className='ms-auto'></p>
                    <p className='ms-auto'></p>
                    <p className='ms-auto'></p>
                    <Button disabled={(value==saved)} onClick={handleSave} variant='success' className='ms-auto'>Save</Button>
                    <Button onClick={handleClose} variant='primary' className='ms-4'><i className="fa-solid fa-xmark"></i></Button>

                </Modal.Header>
                <Modal.Body>
                    <EditorToolbar />
                    <ReactQuill theme="snow" value={value} onChange={e => setValue(e)} style={{ height: '65vh', backgroundColor: 'white' }} modules={modules}
                        formats={formats} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default EditNote;