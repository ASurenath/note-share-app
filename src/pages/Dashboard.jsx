import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Note from '../components/Note';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';
import DeleteNote from '../components/DeleteNote';
import avatar from '../assets/avatar2.png'
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import DeleteUser from '../components/DeleteUser';
import { useContext, useEffect, useState } from 'react';
import { getMyNotesApi, getUserDataApi } from '../apiServices/allApis';
import { SERVER_URL } from '../apiServices/serverUrl';
import { noteUpdateContext, userUpdateContext } from '../Context/ContextShare';
import noData from '../assets/no-data.png'




function Dashboard() {
    const { noteUpdate } = useContext(noteUpdateContext)
    const { userUpdate } = useContext(userUpdateContext)

    const [myNotes, setMyNotes] = useState([])
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState(avatar)
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setPreview(user?.profilePic ? `${SERVER_URL}/uploads/${user.profilePic}`
            : avatar)
    }, [user.profilePic])

    const GetMyNotes = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getMyNotesApi(reqHeader)
        if (result.status == 200) {
            setMyNotes(result.data)
            setLoaded(true)
        }
    }
    const GetMyProfile = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserDataApi(reqHeader)
        if (result.status == 200) {
            setUser(result.data)
        }
    }
    useEffect(() => { GetMyNotes() }, [noteUpdate])
    useEffect(() => { GetMyProfile() }, [userUpdate])

    console.log(user);
    // // ______________________________________________________RETURN

    return (
        <div className='page notebook d-flex flex-column justify-content-start align-items-center bg-secondary text-center pb-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" variant="success" style={{ width: '100vw !important', backgroundColor: 'red' }}>
                <Nav variant="pills " className="flex-row justify-content-center " >
                    <Nav.Item>
                        <Nav.Link eventKey="first" style={{ borderRadius: '50px 0 0 50px' }} className='normal-bold'>Manage Notes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second" style={{ borderRadius: '0 50px 50px 0' }} className='normal-bold'>Profile</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className='w-100'>
                    <Tab.Pane eventKey="first" className='w-100'>
                        <Row className='mx-auto w-75 d-flex justify-content-evenly' >
                            <Col sm={6}>
                                <h2 className='serif-bold text-white pt-4'>Manage your Notes</h2>
                            </Col>
                            <Col sm={6}>
                                <AddNote />
                            </Col>
                        </Row>
                        <Container fluid='sm'>
                            <Row className='py-4'>
                                {loaded ? myNotes?.length > 0 ? myNotes.map((i, index) =>
                                    <Col lg={3} md={4} sm={6} xs={12} key={index} className='controls-parent px-1  py-4' style={{ position: 'relative' }}>
                                        <div className='d-flex justify-content-evenly controls' style={{ position: 'absolute', left: 0, top: '10%', width: '100%', zIndex: '1' }}>
                                            <EditNote note={i} />
                                            <DeleteNote note={i} />
                                        </div>
                                        <Note data={{ ...i, authorDetails: [user] }} />
                                        <h3 className='m-1 p-1 text-white'>{i?.title}</h3>
                                    </Col>
                                )
                                    : <div className='d-flex flex-column justify-content-center align-items-center'>
                                        <h1 className='handwrite text-white'>You haven't created any notes yet!</h1>
                                        <img src={noData} alt="No data" className='img-fluid' />
                                    </div>
                                    : <div className='d-flex justify-content-center align-items-center'>
                                        <Spinner animation="grow" variant="primary" />
                                        <Spinner animation="grow" variant="success" />
                                        <Spinner animation="grow" variant="danger" />
                                        <Spinner animation="grow" variant="warning" />
                                        <Spinner animation="grow" variant="info" />
                                    </div>
                                }
                            </Row>
                        </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className='w-100'>
                        <Row className='mx-auto w-75 d-flex justify-content-evenly'>
                            <Col sm={6}>
                                <h2 className='serif-bold text-white pt-4'>Welcome&nbsp;<span className='text-danger serif-bold text-shadow'>{user?.uname}</span></h2>

                            </Col>                            <Col sm={6}><EditProfile user={user} /></Col>
                        </Row>
                        <Container fluid='sm'>
                            <Row className='py-4 w-100'>

                                <Col md={4} className='px-5 w-100 '>
                                    <img src={preview} className='img-fluid m-2 avatar' alt="" />
                                </Col>
                                <Col md={8} className='px-5 w-100'>
                                    <Row className='text-white fs-4 text-start '>
                                        <Col sm={4} className=' text-shadow pt-1'><p className='handwrite' >Email:</p> </Col>
                                        <Col sm={8} ><p className='handwrite' >{user?.email}</p></Col>
                                        <Col sm={4} className=' text-shadow  pt-1'><p className='handwrite' >Interests:</p> </Col>
                                        <Col sm={8} ><p className='handwrite' >{user?.interests}</p></Col>
                                        <Col sm={4} className=' text-shadow pb-sm-5 pt-1'><p className='handwrite' >Bio:</p> </Col>
                                        <Col sm={8}><p className='pt-1 handwrite' style={{ minHeight: '100px', width: 'min(300px,70vw)' }}>{user?.bio}</p></Col>
                                    </Row>
                                </Col>

                                <Row className='p-3 w-100'>
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