import logo from './logo.svg';
import './App.css';

import Testons from './components/testons';

import QuestionsComponent from './components/questions';
import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ENDPOINT = "http://localhost:8080";
const socket = openSocket(ENDPOINT, { transports: ['websocket'] });

function RadioButton(){
  return null;
}

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    socket.on("quiz", data => {
      setQuestions(data.quiz);
    });
  }, []);
  return (
    
    <div className="App">
               <Testons></Testons>

    <Container>
     <Row >
       <Col className="header">
           <h1 className="display-1 fw-bold">Kwizzz</h1>
           <p className="display-5"> Interactive and Multi-User Quizz.</p>
       </Col>
     </Row>
     </Container>

     <QuestionsComponent questions={questions} socket={socket}></QuestionsComponent>
     <Container>
       <Row>
       <footer id="site-footer">
         <p>Copyright &copy;KWIZZZ 2021</p>
     </footer>
     </Row>
     </Container>
   </div>
  );
}

export default App;
