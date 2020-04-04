import React, { Component } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
const { compose, withProps, lifecycle } = require("recompose");
const {
    StandaloneSearchBox
  } = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {
//    componentWillReceiveProps({someProp}) {
//      this.setState({...this.state,someProp});
//    }
//  }

  return (
      <>
    <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.lat, lng: props.lng }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker 
            onClick={onClick}
            position={marker.LatLng[0]}
            icon={marker.icon}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.placeName}
                </div>
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
      selectedMarker: false
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


var markersOnMap = [{
        placeName: "Chitra ",
        LatLng: [{
            lat: 23.078091,
            lng: 72.575790
        }],
     //   icon : iconBase + 'parking_lot_maps.png'
    },
    {
        placeName: "Het",
        LatLng: [{
            lat: 23.105036,
            lng: 72.594759
        }]
    },
    {
        placeName: "Chitra",
        LatLng: [{
            lat: 23.092582,
            lng: 72.599781
        }],
      ///   icon : iconBase + 'parking_lot_maps.png'
    },
    {
        placeName: "Chitra",
        LatLng: [{
            lat: 23.081212,
            lng: 72.592442
        }]
    },
    {
        placeName: "Het",
        LatLng: [{
            lat: 23.008767,
            lng: 72.594995
        }]
    },
    {
      placeName: "Chitra",
      LatLng: [{
          lat: 23.001696,
          lng: 72.552810
      }]
  }
];

    this.setState({ shelters: markersOnMap });

  }
  handleClick = (marker, event) => {
    // console.log({ marker })

    this.setState({ selectedMarker: marker })
  }

  render() {
    return (
    <React.Fragment>
     
        <br></br>
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        lat = {this.props.lat}
        lng = {this.props.lng}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAeWwZ3gDRU13z6jiQRTuhFkA3ugQG_Q7Q&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />} 
      /> 
    </React.Fragment>
    )
  }
}
