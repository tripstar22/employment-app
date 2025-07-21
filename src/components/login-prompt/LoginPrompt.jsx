// * next.js imports *
import Link from 'next/link';

// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// * styles imports *
import classes from './LoginPrompt.module.scss';

function LoginPrompt() {
  return (
    <section className={classes.loginprompt}>
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs={12} lg={10} xl={8}>
            <div className={classes.loginprompt__content}>
              <h1 className={classes.loginprompt__heading}>Welcome!</h1>
              <h2 className={classes.loginprompt__subheading}>
                Some witty statement pertaining to the mission of the app.
              </h2>
              <p
                className={classes.loginprompt_highlight}
              >
                Encouraging text to sign up!
              </p>
              <div className={classes.loginprompt_ctas}>
                <Link href="/job-seeker-signup" className="button">Job Seeker</Link>
                <Link href="/employer-signup" className="button button___secondary">Employer</Link>
              </div>
              <p className={classes.loginprompt_text}>
                Already have an account?
                {' '}
                <Link href="/login">Login</Link>
              </p>
              <p className={classes.loginprompt_text}>
                Need help?
                {' '}
                <Link href="/help">Help</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoginPrompt;
