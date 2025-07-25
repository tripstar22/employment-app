// * react imports *
import { useState } from 'react';

// * next.js imports *
import { useRouter } from 'next/router';

// * third party library imports *
import PropTypes from 'prop-types';

// * react-bootstrap imports *
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormLogin({ onLogin = null }) {
  // * hooks *
  const router = useRouter();

  // * state *
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');

  // * handlers *
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Call authentication API
      const response = await fetch('/api/auth-job-seeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // Here you can:
      // 1. Store user data in state/context
      // 2. Redirect to dashboard
      // 3. Set authentication token

      // Reset form
      setEmail('');
      setPassword('');

      // Call onLogin callback if provided
      onLogin?.(result.user);

      // Redirect to profile page
      router.push(`/profile/${result.user._id}`);
      console.log('success', result.user);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appform">
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs={12} lg={10} xl={8}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <div className="appform_group">
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="appform_group">
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="appform_actions">
                    {error && <p className="text-danger">{error}</p>}

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

FormLogin.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onLogin: PropTypes.func,
};

export default FormLogin;
