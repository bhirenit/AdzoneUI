import React from 'react';
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

export default function ViewProductCardDetails() {
  const classes = useStyles();

  return (
    <center>
    <Card className={classes.root}>
      
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`http://${server.ip}:${server.port}/product/image/2`}
        //   image={"/adzoneImages/"+props.data.sku+".jpg"}
       //   title={props.data.publicityName}
            title = "Chitra"
            style = {{height: "360px", width: "100%"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            SKU : H_05
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Publicity Name : Chitra
          </Typography> <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Category : Outdoor
          </Typography> <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Media Type : HOARDING
          </Typography> 
          <Typography gutterBottom variant="h6" component="h6">
            {/* Publicity Name : {props.data.publicityName} */}
            Rate Per Month : 54000 Rs
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            Tier : 2
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* Product size : {props.data.size} */}
            Product size : 10 X 12 (feet)
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Address : New C.G. Road, Chandkheda
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          </Typography>

        <InputBox
										label='From'
										type='date'
										name='from'
										isReq={true}
										// errorMessage={formError.email}
										// onChange={this.dataHandler}
										// onBlur={this.validationHandler}
									/>
        <InputBox
										label='To'
										type='date'
										name='to'
										isReq={true}
										// errorMessage={formError.email}
										// onChange={this.dataHandler}
										// onBlur={this.validationHandler}
									/>

                  <Typography variant="body2" color="textSecondary" component="p">

        <Ratings isReadOnly={true} value={4}  />
        </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Button size="large" style= {{backgroundColor: "#663300", color: "white" }} >
         BUY NOW
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