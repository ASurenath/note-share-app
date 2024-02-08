import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Note({ data }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <div onClick={() => setShow(true)} className=' note-card bg-white p-2 mx-5 mb-0' style={{ cursor: 'zoom-in', padding: 0, margin: 0 }}>
                <div dangerouslySetInnerHTML={{ __html: data?.content }} className='p-0 mt-0 mini'></div>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {data.title}
                    </Modal.Title>
                    <p className='ms-auto pt-1'>Author:{data.authorDetails[0].uname}</p>
                    <Button  onClick={()=>{setShow(false)}} variant='primary' className='ms-auto'><i className='fa-solid fa-x'/></Button>
                   
                </Modal.Header>
                <Modal.Body>
                    <div className='hide-toolbar'>
                        <ReactQuill
                            value={data.content}
                            readOnly={true}
                            theme={"snow"}
                            style={{height:'75vh'}}
                        />
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Note;