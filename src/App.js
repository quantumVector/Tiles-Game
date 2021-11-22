import { useEffect, useReducer } from 'react';
import './App.css';
import Tile from './Tile';

const tiles = [
  { id: 1, color: 'color1', status: 'hidden' },
  { id: 2, color: 'color1', status: 'hidden' },
  { id: 3, color: 'color2', status: 'hidden' },
  { id: 4, color: 'color2', status: 'hidden' },
  { id: 5, color: 'color3', status: 'hidden' },
  { id: 6, color: 'color3', status: 'hidden' },
  { id: 7, color: 'color4', status: 'hidden' },
  { id: 8, color: 'color4', status: 'hidden' },
  { id: 9, color: 'color5', status: 'hidden' },
  { id: 10, color: 'color5', status: 'hidden' },
  { id: 11, color: 'color6', status: 'hidden' },
  { id: 12, color: 'color6', status: 'hidden' },
  { id: 13, color: 'color7', status: 'hidden' },
  { id: 14, color: 'color7', status: 'hidden' },
  { id: 15, color: 'color8', status: 'hidden' },
  { id: 16, color: 'color8', status: 'hidden' },
];

const shuffle = (tiles) => {
  let shuffledArray = tiles;
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const initialState = {
  tiles: shuffle(tiles),
  clicks: 0,
  round: 1,
  opened: [],
};

const reducer = (state, action) => {
  const cloneState = { ...state };

  switch (action.type) {
    case 'CHECK-TILE':
      cloneState.tiles.forEach(tile => {
        if (tile.id === action.id) {
          tile.status = `${action.color}-closed`;
          cloneState.opened = [...cloneState.opened, tile];
        };
      });

      return {
        ...cloneState,
        clicks: cloneState.clicks + 1
      };
    case 'OPEN-TILES':
      cloneState.tiles.forEach(tile => {
        if (tile.color === action.color) {
          tile.status = action.color;
        };
      });

      return {
        ...cloneState,
      }
    case 'NEXT-ROUND':
      return {
        ...state,
        clicks: 0,
        round: state.round + 1,
      }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkTile = (id, color) => {
    dispatch({ type: 'CHECK-TILE', id, color });

    state.opened.forEach(tile => {
      if (tile.color === color && tile.id !== id) {
        dispatch({ type: 'OPEN-TILES', color });
      }
    });
  }

  useEffect(() => {
    if (state.clicks === 2 && state.round < 8) {
      dispatch({ type: 'NEXT-ROUND' });
    }
  }, [state.clicks])

  return (
    <div className='app-wrapper'>
      <h1>Round {state.round}</h1>
      <div className='container'>
        {state.tiles.map((tile) => <Tile
          id={tile.id}
          color={tile.color}
          status={tile.status}
          key={tile.id}
          dispatch={dispatch}
          checkTile={checkTile}
        />)}
      </div>
    </div>
  );
}

export default App;
