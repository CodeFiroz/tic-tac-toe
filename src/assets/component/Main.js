import React, { useEffect, useState } from 'react';

const Main = () => {
  const [themove, setThemove] = useState(0);
  const [moves, setMoves] = useState(["", "", "", "", "", "", "", "", ""]);

  const changeMove = () => {
    return themove % 2 === 0 ? "x" : "o";
  };

  const reset = () => {
    setMoves(["", "", "", "", "", "", "", "", ""]);
    setThemove(0);
    const boxes = document.querySelectorAll(".board div");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].innerHTML = "";
    }
  };

  useEffect(() => {
    const boxes = document.querySelectorAll(".board div");

    const handleBoxClick = (i) => {
      if (moves[i] === "") {
        const newMoves = [...moves];
        const response = changeMove();
        newMoves[i] = response;
        setMoves(newMoves);
        setThemove(themove + 1);
        boxes[i].innerHTML = response;
        isWin(newMoves);
      }
    };

    for (let i = 0; i < boxes.length; i++) {
    //   boxes[i].innerHTML = i;
      boxes[i].onclick = () => handleBoxClick(i);
    }
  }, [moves, themove]);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const isWin = (currentMoves) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (currentMoves[a] && currentMoves[a] === currentMoves[b] && currentMoves[a] === currentMoves[c]) {
        alert(`Player ${currentMoves[a]} wins!`);
        reset();
        return;
      }
    }

    if (!currentMoves.includes("")) {
      alert("It's a draw!");
      reset();
    }
  };

  const light = ()=>{
    document.body.classList.toggle("light");
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Tic Tac Toe <span>(XO)</span></h2>
          <div className="right-side">
            <a href="/">CodeFiroz</a>
            <span onClick={reset}>Reset</span>
            <button onClick={light}>
              <i className='bx bxs-moon'></i>
            </button>
          </div>
        </div>
        <div className="board">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Main;
