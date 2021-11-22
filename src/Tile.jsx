import React from 'react';
import classes from './Tile.module.css';
import cn from 'classnames';

const Tile = ({ id, color, status, dispatch, checkTile }) => {
  return (
    <div className={cn(classes.tile, classes[status])}
     style={{ backgroundColor: color }}
     onClick={() => checkTile(id, color)}></div>
  )
}

export default Tile;
