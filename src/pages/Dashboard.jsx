import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Note from '../components/Note';
import { Button, Col, Container, Row } from 'react-bootstrap';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';
import DeleteNote from '../components/DeleteNote';
import avatar from '../assets/avatar.png'
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import DeleteUser from '../components/DeleteUser';




function Dashboard() {
    const sampleText = (i) => {
        return `<h1>Sample Text ${i}</h1>
    <p>Lorem ipsum dolor sit <b>amet consectetur</b> adipisicing elit.</p>
    <h2>Sub heading </h2>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur iste itaque dicta facere nihil, provident accusantium minima explicabo vero tempora voluptate rem magnam sunt, consequatur architecto fuga. Explicabo, cum dignissimos.
</p>
<ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
</ul>
    `}
    return (
        <div className='page notebook d-flex flex-column justify-content-start align-items-center bg-secondary text-center pb-5'>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first" variant="success">
                <Nav variant="pills " className="flex-row justify-content-center ">
                    <Nav.Item>
                        <Nav.Link eventKey="first" style={{ borderRadius: '50px 0 0 50px' }} className='normal-bold'>Manage Notes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second" style={{ borderRadius: '0 50px 50px 0' }} className='normal-bold'>Profile</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="first" className='w-100'>
                        <Row className='mx-auto w-75 d-flex justify-content-evenly'>
                            <Col sm={6}>
                                <h2 className='serif-bold text-white pt-4'>Manage your Notes</h2>
                            </Col>
                            <Col sm={6}>
                                <AddNote />
                            </Col>
                        </Row>
                        <Container fluid='sm'>
                            <Row className='py-4'>
                                {[1, 2, 3, 4].map((i, index) =>
                                    <Col lg={3} md={4} sm={6} xs={12} key={index} className='controls-parent px-1  py-4' style={{ position: 'relative' }}>
                                        <div className='d-flex justify-content-evenly controls' style={{ position: 'absolute', left: 0, top: '10%', width: '100%', zIndex: '1' }}>
                                            <EditNote />
                                            <DeleteNote />
                                        </div>
                                        <Note data={sampleText(i)} />
                                        <h3 className='m-1 p-1 text-white'>{`title ${i}`}</h3>
                                    </Col>
                                )
                                }
                            </Row>
                        </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className='w-100'>
                        <div className='mx-auto w-75 d-flex justify-content-evenly'>
                            <h2 className='serif-bold text-white pt-4'>Welcome&nbsp;<span className='text-danger serif-bold text-shadow'>User!</span></h2>
                            <EditProfile />
                        </div>
                        <Container fluid='sm'>
                            <Row className='py-4 w-100'>

                                <Col md={4} className='px-5 w-100 '>
                                    <img src={avatar} className='img-fluid mx-5' alt="" />
                                </Col>
                                <Col md={8} className='px-5 w-100'>
                                    <Row className='text-white fs-4 text-start'>
                                        <Col sm={4} className=' text-shadow pt-1'><p>Email:</p> </Col>
                                        <Col sm={8} ><p>Email ID</p></Col>
                                        <Col sm={4} className=' text-shadow  pt-1'><p>Interests:</p> </Col>
                                        <Col sm={8} ><p>Topic1, Topic2,Topic3</p></Col>
                                        <Col sm={4} className=' text-shadow pb-sm-5 pt-1'><p>Bio:</p> </Col>
                                        <Col sm={8}><p className='pt-1' style={{ minHeight: '100px', width: 'min(300px,70vw)' }}>Something about you...</p></Col>
                                    </Row>
                                </Col>

                                <Row className=' w-100'>
                                    <Col sm={6} className='mb-3'>
                                        <ChangePassword />

                                    </Col>
                                    <Col sm={6}>
                                        <DeleteUser />
                                    </Col>
                                </Row>
                            </Row>

                        </Container>
                    </Tab.Pane>
                </Tab.Content>


            </Tab.Container>
        </div>
    );
}

export default Dashboard;