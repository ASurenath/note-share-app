import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Note from '../components/Note';
import { addToFavApi, getAllNotesApi, getUserDataApi, removeFromFavApi } from '../apiServices/allApis';


function Browse() {
    const [userId, setUserId] = useState('')
    const [fav, setFav] = useState(false)
    const [allNotes, setAllNotes] = useState([])
    // useEffect(() => {
    //     setToken(sessionStorage.getItem('token'))
    // }, [])

    const GetUserId = async () => {
        const token=sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserDataApi(reqHeader)
        if(result.status==200){
            setUserId(result.data._id)
            console.log(result.data._id);
        }
    }
    console.log(userId);
    useEffect(() => { GetUserId() }, [])

    const callGetAllNotes = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllNotesApi(reqHeader)
        setAllNotes(result.data)
    }
    useEffect(() => { callGetAllNotes() }, [])
    console.log(allNotes);
    const addOrRemoveFav=async(note)=>{
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        if(note?.favouriteOf.includes(userId)){
            await removeFromFavApi({_id:note['_id']},reqHeader)
            
        }
        else{
            await addToFavApi({_id:note['_id']},reqHeader)
        }
        callGetAllNotes()
    }
    return (
        <div className='page notebook d-flex flex-column justify-content-center align-items-center bg-secondary text-center pb-5 pt-lg-5' >
            <Container fluid='sm' style={{ minHeight: '100vh' }}>
                <Row className='w-100'>
                    <Col md={8} className='d-flex justify-content-center align-items-center'>
                        <InputGroup className="mb-3 rounded-5 w-75">
                            <InputGroup.Text id="basic-addon1" style={{ borderRadius: '50px 0 0 50px' }} ><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                            <Form.Control
                                placeholder="Search..."
                                aria-label="Search-box"
                                aria-describedby="search-box"
                                style={{ borderRadius: '0 50px 50px 0' }}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4} className='d-flex justify-content-center align-items-center'>
                        <ToggleButtonGroup type="radio" name="options" className='normal-bold' defaultValue={1} >
                            <ToggleButton onClick={() => setFav(false)} id="tbg-radio-1" value={1} variant={'danger'} style={{ borderRadius: '50px 0 0 50px' }}>
                                <b>All Notes</b>
                            </ToggleButton>
                            <ToggleButton onClick={() => setFav(true)} id="tbg-radio-2" value={2} variant={'danger'} style={{ borderRadius: '0 50px 50px 0' }}>
                                <b>Favourites</b>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <h2 className='text-center serif-bold text-white'>{fav ? <>Favourites</> : <>All Notes</>}</h2>
                <Row className='py-4'>
                    {allNotes?.length>0?allNotes.map((i, index) =>
                        <>
                            {(!fav||i.favouriteOf.includes(userId))&&
                                <Col lg={3} md={4} sm={6} xs={12} key={index} className='px-1  py-4' style={{ position: 'relative' }}>
                                <div className='d-flex justify-content-evenly' style={{ position: 'absolute', left: '20%', top: '10%', width: '100%', zIndex: '1' }}>
                                    <h2 onClick={()=>addOrRemoveFav(i)} className='fav'> {i.favouriteOf.includes(userId)?<i className="fa-solid fa-heart fav-selected"/>:<i className="fa-solid fa-heart" />}</h2>
                                </div>
                                <Note data={i} />
                                <h3 className='m-1 p-1 text-white'>{i?.title}</h3>
                            </Col>}
                        </>
                    ):
                    <div>No notes to display</div>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Browse