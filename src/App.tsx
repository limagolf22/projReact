//import logo from './logo.svg';
import './App.css';

import QuestionsComponent from './components/questions';
import { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { Socket } from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Connexion from './components/Connexion';

const ENDPOINT = "http://localhost:8080";
const socket: Socket = openSocket(ENDPOINT, { transports: ['websocket'] });
 
var gameOn = false;

function App() {
  const [questions, setQuestions] = useState([]);
  const [pseudos,setPseudos] = useState([]);
  useEffect(() => {
    socket.on("quiz", data => {
      gameOn= true;
      setQuestions(data.quiz);
      console.log("game started");
      
    });
    socket.on("users-changed", data => {
      console.log(data);
      setPseudos(data);
  });
  }, []);
  return (
    
    <div className="App">
    <Container>
     <Row >
       <Col className="header">
           <h1 className="display-1 fw-bold">Kwizzz</h1>
           <p className="display-5"> Interactive and Multi-User Quizz.</p>
       </Col>
     </Row>
     </Container>

      {gameOn? <QuestionsComponent questions={questions} socket={socket}/>:
     <Connexion socket={socket} pseudos={pseudos} />}
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
