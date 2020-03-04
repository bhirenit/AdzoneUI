import React from 'react';
import './card-style.scss';

const MyCard = props => {
  return (
      <div className='card text-center shadow'>
        <div className='overflow'>
          <img src={props.src} alt='image' className='card-img-top' />
        </div>
        <div className='card-body text-dark'>
          <h4 className='card-title'>{props.title}</h4>
          <p className='card-text text-secondary'>
            {props.fname}
          </p>
          {/* <p className='card-text text-secondary'>
            {props.lname}
          </p>
          <p className='card-text text-secondary'>
            {props.email}
          </p> */}
          <button className="btn btn-outline-success">Add to Plan</button>
        </div>
      </div>
  );

};
export default MyCard;