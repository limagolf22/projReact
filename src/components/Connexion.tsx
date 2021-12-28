import * as React from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Socket } from 'socket.io-client';
import { InputGroup, FormControl, Button, Table,Alert } from 'react-bootstrap';

export default class Connexion extends React.Component<{socket:Socket,pseudos:string[]},{pseudo:string,pseudoError:boolean}> {
    
    constructor(props:any){
        super(props);
        this.state = {pseudo:"",pseudoError:false};
        
        console.log(this.state);
    }
  
    public render() {
        console.log(this.state);
        return(
            <div className="connection-container">

                {/*<Container>
                    <Row >
                            <div>indiquez votre pseudo</div>
                            <div className='row'>
                                <input id="input-pseudo" type={'text'} value={this.state.pseudo} onChange={this.handleInputChange}></input>
                        
                                <input id="button-pseudo" title="Connexion" type={'button'} onClick={()=>
                                    this.props.socket.emit('send_pseudo',this.state.pseudo)}>
                                </input>
                            </div>
                    </Row>
                                </Container>*/}
                
                <Container>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="choose a pseudo" onChange={(event)=>this.handleInputChange(event as any)} />
                        <Button variant="outline-secondary" id="button-pseudo" onClick={()=>{
                            if(this.props.pseudos.includes(this.state.pseudo)){
                                this.setState({pseudoError:true})
                            }
                            else {
                                this.props.socket.emit('send-pseudo',this.state.pseudo);
                            }
                            
                            }}>Connexion</Button>
                    </InputGroup>
                </Container>
                <Container>
                    {this.state.pseudoError?
                    <Alert variant="danger">
                        <p>Pseudo déjà utilisé, trouvez en un autre</p>
                    </Alert>:null
                    }
                </Container>
                <Container>
                    <Table striped bordered variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Pseudo ({this.props.pseudos.length} connexion(s))</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.pseudos.map((value:string,index:number) =>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{value}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                    
                </Container>
                <Container>
            <Button variant="primary" size="lg" onClick={()=>
                this.props.socket.emit('start-game')} >START</Button>
                </Container>
            </div>

                );
    }

    public handleInputChange(event:React.ChangeEvent<HTMLInputElement>): void{
        this.setState({pseudo:(event.target.value!.toString()),pseudoError:false});
    }
}
