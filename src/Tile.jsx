import React from 'react';
import classes from './Tile.module.css';

const Tile = ({ color }) => {
  return (
    <div className={classes.tile} style={{ backgroundColor: color }}></div>
  )
}

export default Tile;
