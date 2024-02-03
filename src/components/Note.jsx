import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Note({ title, data }) {
    const [show, setShow] = useState(false);

    return (
        <>
            <div onClick={() => setShow(true)} className=' note-card bg-white p-2 mx-5 mb-0' style={{cursor:'zoom-in',padding:0,margin:0}}>
                <div dangerouslySetInnerHTML={{ __html:data}} className='p-0 mt-0 mini'></div>
            </div>
            <h3 className='m-1 p-1 text-white'>{title}</h3>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div  dangerouslySetInnerHTML={{ __html:data}}>
           
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Note;