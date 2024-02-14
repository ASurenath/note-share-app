import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Note from '../components/Note';
import { addToFavApi, getAllNotesApi, getUserDataApi, removeFromFavApi } from '../apiServices/allApis';
import { noteUpdateContext } from '../Context/ContextShare';
import noData from '../assets/no-data.png'

function Browse() {
    const { noteUpdate } = useContext(noteUpdateContext)
    const [userId, setUserId] = useState('')
    const [fav, setFav] = useState(false)
    const [allNotes, setAllNotes] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [loading, setLoading] = useState(true)

    const GetUserId = async () => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getUserDataApi(reqHeader)
            if (result.status == 200) {
                setUserId(result.data._id)

            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => { GetUserId() }, [])

    const callGetAllNotes = async () => {
        //  setLoading(true) 
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getAllNotesApi(reqHeader, searchKey)
            if (result.status == 200) {
                setAllNotes(result.data)
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setLoading(true)
        callGetAllNotes()
    }, [noteUpdate, searchKey])
    console.log(allNotes);

    const addOrRemoveFav = async (e, note,index) => {
        document.getElementById(`fav${index}`).innerHTML="<i class='fa-solid fa-spinner fa-spin-pulse text-black'></i>"
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        if (note?.favouriteOf.includes(userId)) {
            await removeFromFavApi({ _id: note['_id'] }, reqHeader)
        }
        else {
            await addToFavApi({ _id: note['_id'] }, reqHeader)
        }
        await callGetAllNotes()
        document.getElementById(`fav${index}`).innerHTML="<i class='fa-solid fa-heart fs-1' />"

        // document.getElementById(`fav${index}`).innerHTML="<span><i className='fa-solid fa-heart fs-1' /></span>"
    }
    // // ______________________________________________________RETURN

    return (
        <div className='page notebook d-flex flex-column justify-content-center align-items-center bg-secondary text-center pb-5 pt-lg-5' >
            <Container fluid='sm' style={{ minHeight: '100vh' }}>
                <Row className='w-100'>
                    <Col md={8} className='d-flex justify-content-center align-items-center'>
                        <InputGroup className="mb-3 rounded-5 w-75">
                            <InputGroup.Text id="basic-addon1" style={{ borderRadius: '50px 0 0 50px' }} ><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                            <Form.Control
                                value={searchKey}
                                onChange={e => setSearchKey(e.target.value)}
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
                <h2 className='text-center serif-bold text-white'>{fav ? <>Favourites</> : searchKey ? <>Search results for '{searchKey}'</> : <>All Notes</>}</h2>
                <Row className='py-4'>
                    {!loading ? allNotes?.length > 0 ? allNotes.map((i, index) =>
                        <>
                            {(!fav || i.favouriteOf.includes(userId)) &&
                                <Col lg={3} md={4} sm={6} xs={12} key={index} className='px-3 py-4 d-flex flex-column align-items-center justify-content-start' style={{ position: 'relative' }}>
                                    <div className='d-flex justify-content-evenly' style={{ position: 'absolute', left: '50%', top: '10%', width: '100%', maxWidth: '170px', zIndex: '1' }}>
                                        <button onClick={(e) => addOrRemoveFav(e, i,index)} className={i.favouriteOf.includes(userId) ?'flush fs-2 fav-selected':'flush fs-2 fav'} id={`fav${index}`}>  <i className="fa-solid fa-heart fs-1" /> </button>
                                    </div>
                                    <Note data={i} />
                                    <h3 className='text-white'>{i?.title}</h3>
                                </Col>}
                        </>
                    ) :
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <h1 className='handwrite text-white'>No notes to display!</h1>
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
        </div>
    )
}

export default Browse