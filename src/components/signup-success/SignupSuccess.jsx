// * next.js imports *
import Link from 'next/link';

// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// * styles imports *
import classes from './SignupSuccess.module.scss';

function SignupSuccess() {
  return (
    <section className={classes.signupsuccess}>
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs={12} lg={10} xl={8}>
            <div className={`${classes.signupsuccess_content} text-center`}>
              <h1 className={classes.signupsuccess_heading}>Hooray!</h1>
              <p className={classes.signupsuccess_text}>
                Thank you for signing up! Your account has been created
                successfully.
              </p>
              <p className={classes.signupsuccess_text}>
                Please login to continue.
              </p>
              <Link href="/login" className="button">
                Login
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SignupSuccess;
