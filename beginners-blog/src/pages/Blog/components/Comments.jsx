import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import RatingStar from '../../../components/common/RatingStar';
import AvaImage from '../../../images/ava.jpg';

const CommentsComponent = (props) => {
    const { comments } = props;
    return (
        <Container>
            {comments.map((data) => (

                <Row className="comment-item d-flex justify-content-between mb-4 pt-4">
                    <Col sm={1}>

                    </Col>
                    <Col sm={11}>
                        <div className="d-flex flex-column justify-content-center">
                            <h4>User</h4>
                            <RatingStar maxRating={5} value={data?.rating} isShowValue={true} />
                        </div>
                    </Col>
                    <Col sm={1}>

                    </Col>
                    <Col sm={11} className="d-flex justify-content-between mt-3">
                        <p>{data?.comment}</p>

                    </Col>
                </Row>
            ))}
        </Container>
    )
}
export default CommentsComponent;