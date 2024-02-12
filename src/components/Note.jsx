import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import avatar from '../assets/avatar2.png'
import { SERVER_URL } from '../apiServices/serverUrl';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';



function Note({ data }) {
    const [show, setShow] = useState(false);
    console.log(data);
    const renderTooltip = (props) => (
        <Tooltip id="author-tooltip" {...props}>
            <Row className='p-2'>
                <Col xs={4}>
                    <img src={data?.authorDetails[0]?.profilePic?`${SERVER_URL}/uploads/${data.authorDetails[0].profilePic}`:avatar} alt="" className='mini-avatar'/>
                </Col>
                <Col xs={8} className='d-flex align-items-end'>
                    <p className="handwrite fs-4">{data?.authorDetails[0]?.uname}</p>
                </Col>
                <br />
                <p className="handwrite fs-6 text-left">Interests: {data?.authorDetails[0]?.interests}</p>
                <br/>
                    <p className="handwrite fs-6 text-left">Bio: {data?.authorDetails[0]?.bio}</p>

            </Row>
        </Tooltip>
    );

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
                    <Modal.Title id="example-custom-modal-styling-title" className='serif-bold'>
                        {data.title}
                    </Modal.Title>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip} 
                    >
                        <p className='ms-auto pt-1 serif-bold'>Author: {data.authorDetails[0].uname}</p>
                    </OverlayTrigger>
                    <Button onClick={() => { setShow(false) }} variant='primary' className='ms-auto'><i className='fa-solid fa-x' /></Button>

                </Modal.Header>
                <Modal.Body>
                    <div className='hide-toolbar'>
                        <ReactQuill
                            value={data.content}
                            readOnly={true}
                            theme={"snow"}
                            style={{ height: '75vh' }}
                        />
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default Note;