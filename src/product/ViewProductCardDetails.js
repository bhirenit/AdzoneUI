import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Ratings from './Ratings';
import { InputBox } from 'views/UserProfile/InputBox';
import server from 'utilities';

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
  },
  media: {
    height: 100,
  },
});

export default function ViewProductCardDetails(props) {
  const classes = useStyles();
  const [to,setTo] = useState(new Date().toString());
  const [from,setFrom] = useState()
 console.log(props);

  const fromHandler = (e)=>{ 
    setTo(e.target.value);
  }
  const toHandler = (e)=>{
    setFrom(e.target.value);
  }

  

  const addToCart = ()=>{
      const json =localStorage.getItem("cartData");
      let cartData = JSON.parse(json);
      if(cartData){
          cartData.push(props.data.id);
      }
      else{
          cartData = [];
          cartData.push(props.data.id);
      }
      localStorage.setItem("cartData",JSON.stringify(cartData));
     props.history.push("/customer/dashboard");
  }

  return (
    <center>
    <Card className={classes.root}>
      
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http://${server.ip}:${server.port}/product/image/${props.data.id}`}
        //   image={"/adzoneImages/"+props.data.sku+".jpg"}
            title={props.data.publicityName}
          //  title = "Chitra"
            style = {{height: "360px", width: "100%"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            SKU : {props.data.sku}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Publicity Name : {props.data.publicityName}
          </Typography> <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Category : {props.data.category}
          </Typography> <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Media Type : {props.data.mediaType}
          </Typography> 
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Rate Per Month : {props.data.ratePerMonth}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            Tier : {props.data.tier}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* Product size : {props.data.size} */}
            Product size : {props.data.sizex} X {props.data.sizey} (feet)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Address :{props.data.locality}
          </Typography>

        <InputBox
										label='From'
										type='date'
										name='from'
                    isReq={true}
                    defaultValue={from}
                    onChange={fromHandler}
										// errorMessage={formError.email}
										// onChange={this.dataHandler}
										// onBlur={this.validationHandler}
									/>
        <InputBox
										label='To'
										type='date'
										name='to'
                    isReq={true}
                    defaultValue={to}
                    onChange= {toHandler}
										// errorMessage={formError.email}
										// onChange={this.dataHandler}
										// onBlur={this.validationHandler}
									/>

                  <Typography variant="body2" color="textSecondary" component="p">

        <Ratings isReadOnly={true} value={4}  />
        </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Button onClick={addToCart} size="large" style= {{backgroundColor: "#663300", color: "white" }} >
         Add to Cart
        </Button>
        </Typography>
       
        </CardContent>
      </CardActionArea>

      {/* <CardActions style = {{alignItems: "center"}}>
        <Button size="small" color="primary">
          Add to cart
        </Button>
        <Ratings isReadOnly={true} value={4} />
      </CardActions> */}
      
    </Card>
    </center>
  );
}