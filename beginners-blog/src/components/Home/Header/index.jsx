import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../SearchBar';
import { Button } from 'react-bootstrap';
const Header = ({ handleOpenDialogCover, coverPage }) => {
  console.log(coverPage, 'coverPage')

  return <header className='home-header' style={{ backgroundImage: `url(${coverPage})` }}>
    <Container className='py-5'>
      <Row className="d-flex align-items-center mb-3">
        <Col sm={8} >
        </Col>
      </Row>
      <Row >
        <Container className="box-header mb-4">
          <Col sm={8} className="left-box ps-5 text-center">
            <h1 className="white-color">Your own world</h1>
            <p className="white-color">Update your story every day!</p>
            <button className="mt-3" onClick={() => handleOpenDialogCover()}>Change cover</button>
          </Col>
          <Col sm={4}>
            {/* <img className="img-header" src={StarImage} alt="" /> */}
          </Col>
        </Container>
      </Row>
    </Container>
  </header>
};

export default Header;
