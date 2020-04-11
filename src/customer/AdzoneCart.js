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
import { faLessThan } from "@fortawesome/free-solid-svg-icons";




class AdzoneCart extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            key : true
        }
        //this.buttonClick = this.buttonClick.bind(this)
        this.remove = this.remove.bind(this);
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

    remove(list){
        const json  = JSON.parse(localStorage.getItem("cartData"));
        let cartData = [...new Set(json)];
        cartData=cartData.filter((data)=>
        {
           if(list.indexOf(data)===-1){
               return true;
           }
           else{
               return false;
           }
        } )
        console.log(cartData);
        localStorage.setItem("cartData",JSON.stringify(cartData));
        let products = this.state.data;
        products = products.filter((prod)=>
        (list.indexOf(prod.id)===-1));
        this.setState({data :products,key:!this.state.key});
    }


    render() {
        return (
            <>
            <DataTable data={this.state.data} key={this.state.key} remove={this.remove}></DataTable> 
            </>
        )
    }
}

export default AdzoneCart;