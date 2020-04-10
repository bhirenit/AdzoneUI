import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from "axios";
import { Container } from "reactstrap";
import server from 'utilities.js';

import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import { Icon } from "@material-ui/core";
import Muted from "components/Typography/Muted";

const styles = {
  ...cardImagesStyles,
  textWhite: {
    "&, & *": {
      color: "#FFF"
    }
  },
  center:{
      textAlign: "center"
  }
};

const useStyles = makeStyles(styles);

class ViewProductCard extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }

    componentDidMount() {
        
        // axios.get(`http://${server.ip}:${server.port}/customer/home-listing`)
        //     .then(response => {
        //         console.log("response***", response);
        //         this.setState({ data: response.data },()=>{
        //             const {user}=this.state;
        //             this.dummyData=user;
        //             // console.log(this.dummyData);
        //         })
                
        //     })
        //     .catch(error => console.log(error));
        // this.setState({data : [{image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000},
        // {image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000},
        // {image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000},
        // {image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000},
        // {image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000},
        // {image: "F:/adzoneImages/h5.jpg", publicityName: "Chitra", mediaType:"Hoarding", locality: "Chandkheda", price: 2000}]});
        this.setState({data : this.props.data});
    }
    // filterForTable = (response) => {
    //     response.map((obj) => {
    //         Object.keys(obj).filter((key) => {
    //             // key ===  | 
    //         })
    //     })
    // }

    // componentDidMount() {
    // 	this.dummyData = this.state.user;
    // }


    render() {
        return (
            // <Container className="table-container">
            //     <label >Search :</label>
            //     <input type="text" onChange={this.changeSearch} /><br /><br />

            //     <ReactTable
            //         data={user}
            //         columns={columns}
            //         defaultPageSize={10}
            //         pageSizeOptions={[10, 20]}
            //     />
            // </Container>
            <>
            <Container>
              <GridContainer> 
            { this.state.data.map(prod =>{
               // const classes = useStyles();
                return (
                    <GridItem>
                <Card style={{ width: "20rem" }} >
                    <img
                   // className={classes.cardImgTop}
                    data-src="F://adzoneImages/h5.jpg"
                    alt="100%x180"
                    style={{ height: "180px", width: "100%", display: "block" }}
                    src={"/adzoneImages/"+prod.sku+".jpg"}
                    data-holder-rendered="true"
                    />
                    <CardBody>
                    <p>
                        <center>
                    <Icon className="fa fa-user-o" style={{ fontSize: 10, color: "blue" }}></Icon> {prod.outdoor.toUpperCase()}
                        <Muted>{prod.mediaType}</Muted>
                        <label style={{color: "red"}}>{prod.location} </label><br></br>
                        <Icon className="fa fa-inr" style={{ fontSize: 10, color: "green" }}></Icon>{prod.ratePerMonth}
                        </center>
                    </p>
                    <center>
                    <Button color="success">View Product</Button>
                    </center>
                    </CardBody>
                </Card>
                </GridItem>
                )
            })}
           </GridContainer>
           </Container>
            </>
        )
    }
}

export default ViewProductCard;