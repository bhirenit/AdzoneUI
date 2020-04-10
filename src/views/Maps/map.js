import React, { Component } from "react"
import axios from "axios";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import { makeStyles } from "@material-ui/core/styles";
import MapView from "publicity/map/MapView";
import server from 'utilities.js';
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import Muted from "components/Typography/Muted";
import {
  cardTitle,
  cardSubtitle,
  cardLink
} from "assets/jss/material-dashboard-react.js";
import { Link, useHistory } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

const { compose, withProps, lifecycle } = require("recompose");
const {
    StandaloneSearchBox
  } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
//    componentWillReceiveProps({someProp}) {
//      this.setState({...this.state,someProp});
//    }
//  }


const styles = {
  cardTitle,
  cardSubtitle,
  cardLink,
  textCenter: {
    textAlign: "center"
  }
};

const useStyles = makeStyles(styles);
let history = useHistory();

function handleClick(){
 history.push("/viewproduct"); //todo , add view product component link here
}

  return (
      <>
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        let pos  = {
            lat: marker.lat,
            lng: marker.lng
        };
        const classes = useStyles();
        return (
          <Marker 
            onClick={onClick}
            position={pos}
             icon={{
            url: "/map-icons/"+marker.mediaType+".svg",
            scaledSize: new window.google.maps.Size(30, 30)
          }}
           // icon={"/map-icons/"+marker.mediaType+".svg"}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                {/* <Card style={{ width: "15rem", height:"15rem" }}>
                  <CardBody>
                     <h6 className={classes.cardTitle}>{marker.sku}</h6>
                     <Muted>
                     <h6 className={classes.cardSubtitle}>{marker.mediaType}</h6>
                     </Muted>
                     <p>
                      {marker.locality}
                      
                     </p>
                     <Link className={classes.cardLink} to="/viewproduct">View Product</Link>
                     <a
                      href="/viewproduct"
                      className={classes.cardLink}
                      onClick={e => e.preventDefault()}
                    >
                      Card link
                    </a>
                   
                  </CardBody>
                </Card>
               */}
               <Container fixed>
                <Card className={classes.textCenter} style={{ width: "10rem" }} fixed>
                  <CardBody>
                  <h4 className={classes.cardTitle}>{marker.sku}</h4>
                    <p>
                     {marker.publicityName.toUpperCase()}<br/>
                     {marker.mediaType.toUpperCase()}
                    </p>
                    {marker.status === "available" && 
                    <h6 style={{backgroundColor: "green", color: "white"}}>Available </h6>}
                    {marker.status === "reserved" && 
                     <h6 style={{backgroundColor: "red", color: "white"}}> Reserved </h6>}
                    <Button color="primary" onClick ={handleClick}  >View Product</Button>
                  </CardBody>
                </Card>
                </Container>
              </InfoWindow>}
            
          </Marker>
        );
      })}
    </GoogleMap>
   
    </>
  )
})


export default class ShelterMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false,
      mapCenter: props,
      isChanged: true
    }
  }
  componentDidUpdate() {
    console.log(this.state.mapCenter.lat);
    console.log("\n ",this.props.lat);
    if(this.state.mapCenter.lat != this.props.lat || this.state.mapCenter.lng != this.props.lng ) {
      console.log("changed");
      this.setState({mapCenter: this.props, isChanged: !this.state.isChanged });
    }
  }
  
  // componentWillReceiveProps({lat,lng}) {
  //   this.setState({...this.state,lat,lng})
  // }

  componentDidMount() {
    // fetch("https://api.harveyneeds.org/api/v1/shelters?limit=20")
    //   .then(r => r.json())
    //   .then(data => {
    //     this.setState({ shelters: data.shelters })
    //   })
    var iconBase =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/';


// var markersOnMap = [{
//         placeName: "Chitra ",
//         LatLng: [{
//             lat: 23.078091,
//             lng: 72.575790
//         }],
//      //   icon : iconBase + 'parking_lot_maps.png'
//     },
//     {
//         placeName: "Het",
//         LatLng: [{
//             lat: 23.105036,
//             lng: 72.594759
//         }]
//     },
//     {
//         placeName: "Chitra",
//         LatLng: [{
//             lat: 23.092582,
//             lng: 72.599781
//         }],
//       ///   icon : iconBase + 'parking_lot_maps.png'
//     },
//     {
//         placeName: "Chitra",
//         LatLng: [{
//             lat: 23.081212,
//             lng: 72.592442
//         }]
//     },
//     {
//         placeName: "Het",
//         LatLng: [{
//             lat: 23.008767,
//             lng: 72.594995
//         }]
//     },
//     {
//       placeName: "Chitra",
//       LatLng: [{
//           lat: 23.001696,
//           lng: 72.552810
//       }]
//   }
// ];
localStorage.setItem("userId",1);
axios.get(`http://${server.ip}:${server.port}/publicity/get-publicity-map-data/${localStorage.getItem("userId")}`)
            .then(response => {
                console.log("response***", response);
                this.setState({ shelters: response.data },()=>{
                    // console.log(this.dummyData);
                })
            })
            .catch(error => console.log(error));
console.log(localStorage.getItem("userId"));

    // this.setState({ shelters: markersOnMap });

  }
  handleClick = (marker, event) => {
    // console.log({ marker })

    this.setState({ selectedMarker: marker })
  }

  render() {
    return (
    <>
     
        <br></br>
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        key = {this.state.isChanged}
        lat = {this.state.mapCenter.lat}
        lng = {this.state.mapCenter.lng}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeWwZ3gDRU13z6jiQRTuhFkA3ugQG_Q7Q&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} 
      /> 
       {/* <MapView 
        test = "demo"
        key = {this.state.isChanged}
        data = {this.state.shelters}
        center = {this.state.mapCenter}
      ></MapView>  */}
    </>
    )
  }
}
