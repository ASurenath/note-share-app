import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Note from '../components/Note';

function Browse() {
    const [fav, setFav] = useState(false)

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
    `
    }
    return (
        <div className='notebook d-flex flex-column justify-content-center align-items-center bg-secondary text-center pb-5 pt-lg-5' style={{ minHeight: '100vh' }}>
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
                    <Col md={4}>
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
                <h2 className='text-center serif text-white'>{fav ? <>Favourites</> : <>All Notes</>}</h2>
                <Row className='py-4'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i, index) =>
                        <Col lg={3} md={4} sm={6} xs={12} key={index} className='px-1  py-4' style={{ position: 'relative' }}>
                            <div className='d-flex justify-content-evenly' style={{ position: 'absolute', left: '20%', top: '10%', width: '100%', zIndex: '1' }}>
                               <h2 style={{cursor:'pointer'}}> {"dummyFav" == "dummyFav" ? <i className="fa-solid fa-heart text-secondary"/>: <i class="fa-soild fa-heart text-danger"/>}</h2>
                            </div>
                            
                            <Note data={sampleText(i)} />
                            <h3 className='m-1 p-1 text-white'>{`title ${i}`}</h3>
                        </Col>
                    )
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Browse