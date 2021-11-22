import { useReducer } from 'react';
import './App.css';
import Tile from './Tile';

const tiles = [
  { id: 1, color: '#df0b00' },
  { id: 2, color: '#df0b00' },
  { id: 3, color: '#e76801' },
  { id: 4, color: '#e76801' },
  { id: 5, color: '#ffd231' },
  { id: 6, color: '#ffd231' },
  { id: 7, color: '#008127' },
  { id: 8, color: '#008127' },
  { id: 9, color: '#67c9d6' },
  { id: 10, color: '#67c9d6' },
  { id: 11, color: '#004c94' },
  { id: 12, color: '#004c94' },
  { id: 13, color: '#601f93' },
  { id: 14, color: '#601f93' },
  { id: 15, color: '#a01280' },
  { id: 16, color: '#a01280' },
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
  buffer: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state.tiles);

  return (
    <div className="app-wrapper">
      {state.tiles.map((tile) => <Tile color={tile.color} key={tile.id} />)}

    </div>
  );
}

export default App;
