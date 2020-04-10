import React, { Component } from "react";
import 'react-table/react-table.css';
import { Container } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";


import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import DataTable from "./DataTable";
import Axios from "axios";
import server from "utilities";




class AdzoneCart extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
        //this.buttonClick = this.buttonClick.bind(this)
    }

    componentDidMount() {
        const json =localStorage.getItem("cartData");
        let cartData =  new Set(JSON.parse(json));
        let list = [];
        cartData.forEach(data => list.push(data));
        Axios.post(`http://${server.ip}:${server.port}/product/get-by-id-list`,list)
        .then(res => {
            console.log("response***", res);
            this.setState({ data: res.data },()=>{
                const {data}=this.state;
                this.dummyData=data;
                // console.log(this.dummyData);
            })
            
        })
        .catch(error => console.log(error));

        console.log("Data",this.state.data);
     
    }



    render() {
        return (
            <>
            <DataTable data={this.state.data}></DataTable> 
            </>
        )
    }
}

export default AdzoneCart;