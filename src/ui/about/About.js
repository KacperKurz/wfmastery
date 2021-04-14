import React from "react"
import {connect} from "react-redux"
import {Navbar,Nav, Container, Jumbotron} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"

function About(){

    return <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Warframe Mastery</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link to={"/"}><Link to={"/"}>Home</Link></Nav.Link>
                    <Nav.Link to={"/about"}><Link to={"/about"}>About</Link></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Jumbotron fluid>
            <Container>
                <h1>Warframe Mastery</h1>
                <p>
                    is a simple site that allows you to track your in-game progress and view detailed information.
                </p>
                <p>
                    Created by Kacper Kurz using <a href={"https://docs.warframestat.us/"}>unofficial warframe api</a>.
                </p>
            </Container>
        </Jumbotron>
    </div>
}

export default connect(undefined, undefined)(About)