// * react imports *
import { useState } from 'react';

// * react-bootstrap imports *
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// * custom component imports *
import SignupSuccess from '@/components/signup-success/SignupSuccess';

function FormJobSeekerSignup() {
  // * state *
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    professionalTitle: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // * handlers *
  const handlerInputChange = function handlerFormInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      // Check if passwords match when either password field changes
      if (name === 'password' || name === 'confirmPassword') {
        const password = name === 'password' ? value : prevData.password;
        const confirmPassword = name === 'confirmPassword' ? value : prevData.confirmPassword;
        setPasswordsMatch(password === confirmPassword || confirmPassword === '');
      }

      return newData;
    });
  };

  const handlerSubmit = async function handlerFormSubmit(event) {
    event.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setIsSubmitting(true);

    try {
      // Call API route instead of Sanity directly
      const response = await fetch('/api/create-job-seeker-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          professionalTitle: formData.professionalTitle,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create account');
      }

      console.log('User created successfully:', result.user);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        professionalTitle: '',
      });
      setPasswordsMatch(true);

      // Show success component
      setIsSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appform">
      {isSuccess ? (
        <SignupSuccess />
      ) : (
        <Container>
          <Row className="justify-content-lg-center">
            <Col xs={12} lg={10} xl={8}>
              <Form onSubmit={handlerSubmit}>
                <Row>
                  <Col>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handlerInputChange}
                          placeholder="Enter your first name"
                          required
                        />
                      </Form.Group>
                    </div>
                  </Col>
                  <Col>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handlerInputChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handlerInputChange}
                          placeholder="Enter email"
                          required
                        />
                        <Form.Text className="text-muted">
                          We&apos;ll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handlerInputChange}
                          placeholder="Enter password"
                          required
                        />
                        <Form.Text className="text-muted">
                          Choose a strong password.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handlerInputChange}
                          placeholder="Confirm password"
                          required
                          isInvalid={!passwordsMatch && formData.confirmPassword !== ''}
                        />
                        <Form.Control.Feedback type="invalid">
                          Passwords do not match.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="appform_group">
                      <Form.Group controlId="formJobSeekerSignupProfessionalTitle">
                        <Form.Label>Professional Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="professionalTitle"
                          value={formData.professionalTitle}
                          onChange={handlerInputChange}
                          placeholder="Enter your professional title"
                          required
                        />
                      </Form.Group>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="appform_actions">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !passwordsMatch || formData.confirmPassword === ''}
                      >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default FormJobSeekerSignup;
