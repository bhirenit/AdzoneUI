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
import { Link } from "react-router-dom";
import AdzoneCard from "./AdzoneCard";

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
            data : [],
            viewLink : '/customer/view-product/'
        }
        //this.buttonClick = this.buttonClick.bind(this)
    }

    componentDidMount() {
        
        const str = localStorage.getItem("userData");
        if(str){
            let user = JSON.parse(str);
            if(user.role===2){
              this.setState({viewLink: "/customer/view-product/" });
            }
            else
            {
              this.setState({viewLink: "/publicity/view-product/" });
            }
        }
        else
        {
          return true;
        }

        this.dummyData = this.props.data;
    }


    isCustomer(){
       
      }


    render() {
        return (
           
            <>
            <Container>
              <GridContainer> 
            { this.props.data.map(prod =>{
               
                    const link = this.state.viewLink +""+prod.id;

               // const classes = useStyles();
                return (
                    <GridItem>
                {/* <Card style={{ width: "20rem" }} >
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
                    <Button color="success"> <Link style={{color:"white"}} to={link}>View Product</Link>
                    </Button>
                    </center>
                    </CardBody>
                </Card> */}
                <AdzoneCard prod = {prod} link={link} {...this.props} />
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