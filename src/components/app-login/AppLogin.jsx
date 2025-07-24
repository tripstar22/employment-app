// * next.js imports *
import Link from 'next/link';

// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// * custom component imports *
import FormLogin from '@/components/forms/FormLogin';

// * styles imports *
import classes from './AppLogin.module.scss';

function AppLogin() {
  return (
    <section className={classes.applogin}>
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <div className={`${classes.applogin_content} text-center`}>
              <h1 className={classes.applogin_heading}>Login</h1>
              <p className={classes.applogin_text}>
                Please enter your credentials to access your account.
              </p>
              <p className={classes.applogin_text}>
                Don&apos;t have an account?
                {' '}
                <Link href="/">Sign Up</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <FormLogin />
    </section>
  );
}

export default AppLogin;
