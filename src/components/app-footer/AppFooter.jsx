// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

// * styles imports *
import classes from './AppFooter.module.scss';

function AppFooter() {
  return (
    <footer className={classes.appfooter}>
      <Container>
        <Row>
          <Col>
            <Nav className={classes.appfooter_nav}>
              <Nav.Link href="#" className={classes.appfooter_link}>Privacy Policy</Nav.Link>
              <Nav.Link href="#" className={classes.appfooter_link}>Terms of Service</Nav.Link>
              <Nav.Link href="#" className={classes.appfooter_link}>Contact Us</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;
