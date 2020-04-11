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
        this.removeAndBuy = this.removeAndBuy.bind(this);
    }

    componentDidMount() {
        const json =localStorage.getItem("cartData");

        let demoData =  JSON.parse(json);
        let temp = demoData.map((data)=> data.id);
        let cartData = demoData.filter((data)=>{
               if(temp.indexOf(data.id)===-1){
                   return false
               }else{
                   let ind = temp.indexOf(data.id);
                   delete temp[ind];
                   return true;
               }
        })
        let list = [];
        cartData.forEach(data => list.push(data.id));
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

    removeAndBuy(list){
        const json  = JSON.parse(localStorage.getItem("cartData"));
        let cartData = [...new Set(json)];
        let buyList = [];
        cartData=cartData.filter((data)=>
        {
           if(list.indexOf(data.id)===-1){
               return true;
           }
           else{
               buyList.push(data);
               return false;
           }
        } )
        localStorage.setItem("buyList",JSON.stringify(buyList));
        const user= JSON.parse(localStorage.getItem("userData"));
        console.log(user);
        let reqData = {
         "customerId" : user.id,
         "products" : buyList
        };
        console.log("BuY LIST :" + JSON.stringify(reqData));
        // Axios.post(`http://${server.ip}:${server.port}/product/buy-products`,)
        // .then(res => {
        //     console.log("response***", res);
        //     this.setState({ data: res.data },()=>{
        //         const {data}=this.state;
        //         this.dummyData=data;
        //         // console.log(this.dummyData);
        //     })
            
        // })
        // .catch(error => console.log(error));
        localStorage.setItem("cartData",JSON.stringify(cartData));
        let products = this.state.data;
        products = products.filter((prod)=>
        (list.indexOf(prod.id)===-1));
        this.setState({data :products,key:!this.state.key});

    }

    remove(list){
        const json  = JSON.parse(localStorage.getItem("cartData"));
        let cartData = [...new Set(json)];
        cartData=cartData.filter((data)=>
        {
           if(list.indexOf(data.id)===-1){
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
            <DataTable data={this.state.data} key={this.state.key} remove={this.remove} removeAndBuy={this.removeAndBuy}></DataTable> 
            </>
        )
    }
}

export default AdzoneCart;