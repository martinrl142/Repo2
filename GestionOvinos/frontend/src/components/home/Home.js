import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoginButtonHome from '../login/LoginButtonHome'

export default class Home extends Component {

    
    render() {
        return (
            <div className="homeContenedor">
                <Container>
                    <Row>
                    <Col xs={12}><LoginButtonHome />
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}