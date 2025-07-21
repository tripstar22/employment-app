// * react imports *
import { useState } from 'react';

// * react-bootstrap imports *
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function FormJobSeekerSignUp() {
  // * state *
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // * handlers *
  const handlerInputChange = function handlerFormInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlerSubmit = async function handlerFormSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Call our API route instead of Sanity directly
      const response = await fetch('/api/create-job-seeker-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      });

      // You might want to redirect or show success message here
      console.log('Success: Account created!');
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="appform">
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs={12} lg={10} xl={8}>
            <Form onSubmit={handlerSubmit}>
              <Form.Group controlId="formJobSeekerSignUpName">
                <Row>
                  <Col>
                    <div className="appform_group">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handlerInputChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="appform_group">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handlerInputChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formJobSeekerSignUpUserCredentials">
                <Row>
                  <Col xs={12}>
                    <div className="appform_group">
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
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="appform_group">
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
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="appform_group">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handlerInputChange}
                        placeholder="Confirm password"
                        required
                      />
                      <Form.Text className="text-muted">
                        Choose a strong password.
                      </Form.Text>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="formJobSeekerSignUpName">
                <Row>
                  <Col>
                    <div className="appform_group">
                      <Form.Label>Professional Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="professionalTitle"
                        value={formData.professionalTitle}
                        onChange={handlerInputChange}
                        placeholder="Enter your professional title"
                        required
                      />
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <div className="appform_actions">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormJobSeekerSignUp;
