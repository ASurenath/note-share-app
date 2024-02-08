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
import { useEffect, useState } from 'react';
import { getMyNotesApi, getUserDataApi } from '../apiServices/allApis';
// import { useDispatch, useSelector } from 'react-redux'





function Dashboard() {
    // const [token, setToken] = useState('')
    const [myNotes, setMyNotes] = useState([])
    const [user,setUser]=useState([])
    const [noteUpdate,setNoteUpdate]=useState(true)
    // const update = useSelector(state => state.updateReducer)

    // useEffect(() => {
    //     setToken(sessionStorage.getItem('token'))
    // }, [])

    const GetMyNotes = async () => {
        const token=sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getMyNotesApi(reqHeader)
        if(result.status==200){
            setMyNotes(result.data)
        }
    }
    const GetMyProfile = async () => {
        const token=sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserDataApi(reqHeader)
        if(result.status==200){
            setUser(result.data)
        }
    }
    useEffect(() => { GetMyNotes() }, [noteUpdate])
    useEffect(() => { GetMyProfile() }, [])

    console.log(user);
    
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
                                <AddNote  noteUpdate={noteUpdate} setNoteUpdate={setNoteUpdate}/>
                            </Col>
                        </Row>
                        <Container fluid='sm'>
                            <Row className='py-4'>
                                {myNotes?.map((i, index) =>
                                    <Col lg={3} md={4} sm={6} xs={12} key={index} className='controls-parent px-1  py-4' style={{ position: 'relative' }}>
                                        <div className='d-flex justify-content-evenly controls' style={{ position: 'absolute', left: 0, top: '10%', width: '100%', zIndex: '1' }}>
                                            <EditNote note={i} noteUpdate={noteUpdate} setNoteUpdate={setNoteUpdate}/>
                                            <DeleteNote note={i} noteUpdate={noteUpdate} setNoteUpdate={setNoteUpdate}/>
                                        </div>
                                        <Note data={{...i,authorDetails:[{uname:'Dummy User'}]}} />
                                        <h3 className='m-1 p-1 text-white'>{i?.title}</h3>
                                    </Col>
                                )
                                }
                            </Row>
                        </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className='w-100'>
                        <div className='mx-auto w-75 d-flex justify-content-evenly'>
                            <h2 className='serif-bold text-white pt-4'>Welcome&nbsp;<span className='text-danger serif-bold text-shadow'>{user?.uname}</span></h2>
                            <EditProfile/>
                        </div>
                        <Container fluid='sm'>
                            <Row className='py-4 w-100'>

                                <Col md={4} className='px-5 w-100 '>
                                    <img src={avatar} className='img-fluid mx-5' alt="" />
                                </Col>
                                <Col md={8} className='px-5 w-100'>
                                    <Row className='text-white fs-4 text-start'>
                                        <Col sm={4} className=' text-shadow pt-1'><p>Email:</p> </Col>
                                        <Col sm={8} ><p>{user?.email}</p></Col>
                                        <Col sm={4} className=' text-shadow  pt-1'><p>Interests:</p> </Col>
                                        <Col sm={8} ><p>{user?.interests}</p></Col>
                                        <Col sm={4} className=' text-shadow pb-sm-5 pt-1'><p>Bio:</p> </Col>
                                        <Col sm={8}><p className='pt-1' style={{ minHeight: '100px', width: 'min(300px,70vw)' }}>{user?.bio}</p></Col>
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