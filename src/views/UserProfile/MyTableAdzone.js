import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import axios from "axios";
import { Container } from "reactstrap";
import server from 'utilities.js';

class MyTableAdzone extends Component {
    dummyData = [];
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            user: []
        }
    }

    componentDidMount() {
        const {user}=this.state;
        axios.get(`http://${server.ip}:${server.port}/customer/home-listing`)
            .then(response => {
                console.log("response***", response);
                this.setState({ user: response.data },()=>{
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

    changeSearch = (e) => {
        const { value } = e.target;
        console.log("dummydata", this.dummyData);
        let search = value.toString().toLowerCase().trim();
         const filterData = this.dummyData.filter(item => Object.keys(item).some(value => item[value].toString().toLowerCase().includes(search)));
       // const filterData = this.dummyData.filter(item => Object.keys(item).some(value => item[value].toString().includes(search)));
        this.setState({ user: filterData });
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
                <label >Search :</label>
                <input type="text" onChange={this.changeSearch} /><br /><br />

                <ReactTable
                    data={user}
                    columns={columns}
                    defaultPageSize={10}
                    pageSizeOptions={[10, 20]}
                />
            </Container>
        )
    }
}

export default MyTableAdzone;