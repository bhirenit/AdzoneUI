import Map1 from "views/UserProfile/Map1.js";
var React = require('react');
var Component = React.Component;

 class NewMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }}
        get=(e)=>{
            const{name,value}=e.target;
        console.log(name,value,"********************************************");
            this.setState({ [name]:value });
            this.props.getAddHandler(e) 
          }
    render() {
      return(
          <Map1
       google={this.props.google}
       center={{lat: 23.105030, lng: 72.594759}}
       height='300px'
       zoom={15}
       get={this.get}
      />
        )
    }
  }

  export default NewMap;