import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
const Footers = ({ label }) => (

    <Container fluid style={{ background: "#e1e1e1", borderTop: "1px solid #000" }}>
        <Container>
            <Row>
                <Col sm={12} className="text-center">
                    <h3>Power by iws-final HANU</h3>
                    <div className="d-flex justify-content-center">
                        <Link>
                            <FacebookIcon className="me-2" />
                        </Link>
                        <Link style={{ color: "#f06c05" }}>
                            <InstagramIcon className="me-2" />
                        </Link>
                        <Link style={{ color: "#1c9cea" }}>
                            <TwitterIcon />
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>

);

export default Footers;
