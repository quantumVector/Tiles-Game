/* eslint-disable react-hooks/exhaustive-deps */
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
  count: 0,
  finish: false,
};

const reducer = (state, action) => {
  const cloneState = { ...state };

  switch (action.type) {
    case 'CHECK-TILE':
      cloneState.tiles.forEach(tile => {
        if (tile.id === action.id) {
          tile.status = action.color;
          cloneState.opened = [...cloneState.opened, tile];
        };
      });

      return {
        ...cloneState,
        clicks: state.clicks + 1,
      };
    case 'SET-DEFAULT-SETTINGS':
      cloneState.tiles.forEach(tile => {
        if (tile.status !== 'disapear') tile.status = 'hidden';
      });

      return {
        ...cloneState,
      }
    case 'SET-DISABLED-STATUS':
      cloneState.tiles.forEach(tile => {
        if (tile.id !== state.opened[0].id
          && tile.id !== state.opened[1].id
          && tile.status !== 'disapear') {
          tile.status = 'disabled';
        }
      });

      return {
        ...cloneState,
      };
    case 'SET-ENABLE-STATUS':
      cloneState.tiles.forEach(tile => {
        if (tile.id !== state.opened[0].id && tile.id !== state.opened[1].id) {
          tile.status = 'hidden';
        }
      });

      return {
        ...cloneState,
      }
    case 'DISAPEAR-TILES':
      cloneState.tiles.forEach(tile => {
        if (state.opened[0].id === tile.id || state.opened[1].id === tile.id) {
          tile.status = 'disapear'
        }
      });

      return {
        ...cloneState,
        count: cloneState.count + 1,
      }
    case 'NEXT-ROUND':
      let isFinish = false;
      let lastRound = 0;

      if (state.count === 8) {
        isFinish = true;
        lastRound = state.round;
      }

      return {
        ...state,
        clicks: 0,
        round: lastRound || state.round + 1,
        opened: [],
        finish: isFinish,
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
        setTimeout(() => {
          dispatch({ type: 'DISAPEAR-TILES', color });
        }, 1000)
      }
    });
  }

  useEffect(() => {
    if (state.clicks === 2) {
      dispatch({ type: 'SET-DISABLED-STATUS' });
      setTimeout(() => {
        dispatch({ type: 'SET-DEFAULT-SETTINGS' });
        dispatch({ type: 'NEXT-ROUND' });
      }, 1500);
    }
  }, [state.clicks])

  return (
    <div className='app-wrapper'>
      {!state.finish && <h1>Round {state.round}</h1>}
      {state.finish && <h1>Your score: {state.round}</h1>}
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
