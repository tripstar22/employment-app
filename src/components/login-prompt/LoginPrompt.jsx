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
        <Row>
          <Col>
            <div className={classes.loginprompt__content}>
              <h1 className={classes.loginprompt__heading}>Welcome!</h1>
              <h2 className={classes.loginprompt__subheading}>
                Some witty statement pertaining to the mission of the app.
              </h2>
              <p
                className={`${classes.loginprompt__text} ${classes.loginprompt__text__highlight}`}
              >
                Encouraging text to get started!
              </p>
              <div>
                <Link href="/employer-signup">Employer</Link>
                <Link href="/job-seeker-signup">Job Seeker</Link>
              </div>
              <p>
                Already have an account?
                {' '}
                <Link href="/login">Login</Link>
              </p>
              <p>
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
