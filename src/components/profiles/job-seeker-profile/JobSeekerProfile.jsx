// * third party library imports *
import PropTypes from 'prop-types';

// * react-bootstrap imports *
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function JobSeekerProfile({ firstName, lastName, professionalTitle }) {
  return (
    <Container>
      <Row>
        <Col xs={12} lg={10} xl={8}>
          <h1>
            {firstName} {lastName}
          </h1>
          <h2>{professionalTitle}</h2>
        </Col>
      </Row>
    </Container>
  );
}

JobSeekerProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  professionalTitle: PropTypes.string.isRequired,
};

export default JobSeekerProfile;
