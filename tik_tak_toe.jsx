

const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState('');
  const [status, setStatus] = React.useState(null);
  const xo = ['O', 'X'];
  const palet = ['orange', 'blue', 'purple'];
  const getRandomColor = () => palet [Math.floor (Math.random()*3)];

  React.useEffect(() => {
  console.log(`Render ${id}`);
  return () => console.log(`unmounting Square ${id}`);
})
  
  return (
    <button  onClick={(e) => { 
      let col = getRandomColor();
      setColor(col);
      let nextPlayer = newState(id);
      setStatus(nextPlayer);
      e.target.style.background = col;
    }}> 
  
     <h1>{xo[status]}</h1>
     </button>
  )
}


const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const[state, setState] = React.useState(Array(9).fill(null));

  function checkWinner(state){

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i=0; i < win.length; i++){
        const [a, b, c] = win[i];
        if (state[a] == state[b] && state[a] == state[c] && state[a])
        return state[a];
    }
    return null;
}

  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if(winner != null) status = `Player ${winner} is the winner!! Hooray!!!`

  const newState = idOfSquare =>{
    let thePlayer = player
    state[idOfSquare] = player;
    setState(state);
    let nextplayer =(player + 1)%2;
    setPlayer(nextplayer);

    return thePlayer;
  }

  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());
  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>
  }


  return (
    <div
      className="game-board">
     <div className="grid-row">
     { mounted && renderSquare(0)}
     {mounted && renderSquare(1)}
     {mounted && renderSquare(2)}
     </div>
     <div className="grid-row">
     { mounted && renderSquare(3)}
     {mounted && renderSquare(4)}
     {mounted && renderSquare(5)}
     </div>
     <div className="grid-row">
     { mounted && renderSquare(6)}
     {mounted && renderSquare(7)}
     {mounted && renderSquare(8)}
     </div>
    <div id="info">
      <button onClick={toggle}>Show/Hide Row</button>
      <button onClick={reRender}>Re-render</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};




// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
