// * react imports *
import { useState } from 'react';

// * next.js imports *
import Link from 'next/link';

// * react-bootstrap imports *
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// * icon imports *
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// * custom component imports *
import OffcanvasNav from '@/components/offcanvas-nav/OffcanvasNav';

// * styles imports *
import classes from './AppHeader.module.scss';

function AppHeader() {
  // * state *
  const [show, setShow] = useState(false);

  // * handlers *
  const handleOffcanvasClose = function handlerOffcanvasClose() {
    setShow(false);
  };
  const handleOffcanvasOpen = function handlerOffcanvasOpen() {
    setShow(true);
  };

  return (
    <Navbar bg="light" expand="lg" className={classes.appheader}>
      <Container fluid>
        <div>
          <button
            type="button"
            onClick={handleOffcanvasOpen}
            aria-label="Open navigation menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </button>
          <OffcanvasNav show={show} onHide={handleOffcanvasClose} />
        </div>
        <div className={classes.appheader_brand}>
          <Link href="/">
            Employment App
          </Link>
        </div>
        <Nav>
          <Nav.Link href="#">
            <SearchIcon />
          </Nav.Link>
          <Nav.Link href="#">
            <AccountCircleIcon />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppHeader;
