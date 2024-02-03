import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';


function Dashboard() {
  return (
    <div className='notebook d-flex flex-column justify-content-start align-items-center bg-secondary text-center pb-5' style={{minHeight:'100vh'}}>

    <Tab.Container id="left-tabs-example" defaultActiveKey="first" variant="success">
        
          <Nav variant="pills " className="flex-row justify-content-center">
            <Nav.Item>
              <Nav.Link   eventKey="first"  style={{borderRadius:'50px 0 0 50px'}}>Manage Notes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  eventKey="second"  style={{borderRadius:'0 50px 50px 0'}}>Profile</Nav.Link>
            </Nav.Item>
          </Nav>
        
        
          <Tab.Content>
            <Tab.Pane eventKey="first">First tab content</Tab.Pane>
            <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
          </Tab.Content>
        
      
    </Tab.Container>
    </div>
  );
}

export default Dashboard;