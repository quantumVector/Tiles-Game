import React from 'react';
import classes from './Tile.module.css';
import cn from 'classnames';

const Tile = ({ id, color, status, checkTile }) => {
  return (
    <div className={cn(classes.tile, classes[status])}
      onClick={() => checkTile(id, color)}></div>
  )
}

export default Tile;
