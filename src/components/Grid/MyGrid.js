import React from 'react';
import MyCard from 'views/Dashboard/MyCard';
import { Col, Row, Button } from 'reactstrap';
// import 'src/views/Dashboard/card-style.scss';

export default class MyGrid extends React.Component {
  render() {
    return (
      <>
        <div className='container-fluid d-flex justify-content-center'>
          <div className='row'>
            <div className='col-md-4'>
              <MyCard 
              // key={index}
              title='Chitra'
              // src={item.avatar}
              fname="hii"
              lname="hello"
              email="huhuh" 
              />
            </div>
            <div className='col-md-4'>
            <MyCard title='Chitra'
              // src={item.avatar}
              fname="hii"
              lname="hello"
              email="huhuh" 
              />
            </div>
            <div className='col-md-4'>
            <MyCard title='Chitra'
              // src={item.avatar}
              fname="hii"
              lname="hello"
              email="huhuh" 
              />
            </div>
          </div>
        </div>

        {/* <Row>
          {this.props.user.map((item, index) => {
            return <Col md={4} xs={12} sm={12} key={index}><div className="block" >
              <img src={item.avatar} alt="user" />
              <p>{item.first_name}</p>
              <p>{item.last_name}</p>
              <p>{item.email}</p>
              <center><Button>Click me</Button></center>
            </div></Col>
          })}
        </Row> */}
        {/* <div className='container-fluid d-flex justify-content-center'>
          <div className='row'>
            {this.props.user.map((item, index) => {
              return <div className='col-md-4'>
                <MyCard
                  key={index}
                  title='Chitra'
                  src={item.avatar}
                  fname={item.first_name}
                  lname={item.last_name}
                  email={item.email}
                />
              </div>
            })}
          </div>
        </div> */}

        {/* {this.props.user.map((item, index) => {
          return <MyCard
            key={index}
            src={item.avatar}
            fname={item.first_name}
            lname={item.last_name}
            email={item.email}
          />
        })} */}
      </>
    );
  }
}
