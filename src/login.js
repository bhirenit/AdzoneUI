import React, { Component } from "react";
import SignIn from "loginForm";

class Login extends Component {
	dummyData = [];
	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',
			user: []
		}
    }
    componentWillMount(){
       
    }

	componentDidMount() {
        let userData = localStorage.getItem("userData");
        if(userData){
            let user = JSON.parse(userData);
            if(user.role===0)
               this.props.history.push("/admin/dashboard")
            else if(user.role===1)
               this.props.history.push("/publicity/dashboard")
            else if(user.role===2)
               this.props.history.push("/customer/dashboard")
            else    
                 console.log("error");
        }
	
    }

	render() {

		return (
			<>
            <SignIn {...this.props}></SignIn>
            </>
		)
	}
}

export default Login;