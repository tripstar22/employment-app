// * third party library imports *
import PropTypes from 'prop-types';

// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

// * icon imports *
import CloseIcon from '@mui/icons-material/Close';

// * styles imports *
import classes from './OffcanvasNav.module.scss';

function OffcanvasNav({ show, onHide }) {
  return (
    <Offcanvas show={show} className={classes.offcanvasnav}>
      <Container>
        <Row>
          <Col>
            <button
              type="button"
              onClick={onHide}
              aria-label="Close navigation menu"
              className={classes.offcanvasnav_button}
            >
              <CloseIcon />
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Nav className={classes.offcanvasNav_links}>
              <Nav.Link href="#">Item 1</Nav.Link>
              <Nav.Link href="#">Item 2</Nav.Link>
              <Nav.Link href="#">Item 3</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Offcanvas>
  );
}

OffcanvasNav.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default OffcanvasNav;
