import React from 'react';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js"; 
import Muted from "components/Typography/Muted";
import { Link } from "react-router-dom";    
import { Icon } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";

export default function AdzoneCard(props) {

    const {prod} = props;
    return (
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
                <div>
            <Link style={{color:"white"}} to={props.link}><Button color="success">View Product</Button></Link>
            </div>
            </center>
            </CardBody>
            </Card>
    );
  }



