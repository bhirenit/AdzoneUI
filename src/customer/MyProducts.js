import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from "axios";
import { Container } from "reactstrap";
import server from 'utilities.js';
import { Icon, Button } from "@material-ui/core";
import ViewCard from "./ViewCard";


class MyProducts extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            user: []
        }
       // this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        let {user}=this.state;
        const userData = JSON.parse(localStorage.getItem("userData"));

     //   console.log(this.props);
        axios.get(`http://${server.ip}:${server.port}/product/customer/${userData.id}`)
            .then(response => {
                console.log("response***", response);
                if(response.data[0])
                    this.setState({ user: response.data });
            })
            .catch(error => console.log(error));
    }
  


   

    render() {


        const { user } = this.state;
        const columns = [
            {
                Header: 'Media Type',
                accessor: 'mediaType'
            },
            {
                Header: 'Size',
                accessor: 'dimension'
            }, {
                Header: 'Location',
                accessor: 'location'
            }, {
                Header: 'City',
                accessor: 'city'
            }, {
                Header: 'Rate',
                accessor: 'ratePerMonth'
            }]

        return (
            <Container className="table-container">
                  
                    <ViewCard 
                         data = {user}
                         {...this.props}
                    />
                  
            </Container>
        )
    }
}

export default MyProducts;