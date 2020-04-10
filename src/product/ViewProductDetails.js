import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from "axios";
import { Container } from "reactstrap";
import server from 'utilities.js';
import { Icon, Button } from "@material-ui/core";
import ViewProductCardDetails from "./ViewProductCardDetails";


class ViewProductDetails extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            productData: [],
            isListView: true
        }
        this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        const {user}=this.state;
        console.log(this.props)
        axios.get(`http://${server.ip}:${server.port}/product/${this.props.match.params.productId}`)
            .then(response => {
                console.log("response***", response);
                this.setState({ productData: response.data },()=>{
                    const {user}=this.state;
                    this.dummyData=user;
                    // console.log(this.dummyData);
                })
                
            })
            .catch(error => console.log(error));
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

  
    
    handleClick = (e) => {
        this.setState({isListView: !this.state.isListView});
      }

    render() {
        return (
          <>
          <ViewProductCardDetails data={this.state.productData} {...this.props} />
          </>
        )
    }
}

export default ViewProductDetails;