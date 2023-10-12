"use client"
import React, { useState } from "react";
import "./style.css";
import img from "./peach1.gif";
import Image from "next/image";

export default function Home(props) {
  const [turn, setTurn] = useState("X");
  const [over, setOver] = useState("0");
  let css = {
    // border: props.mode === "light" ? "2px solid black" : "2px solid white",
  };

  const handleGame = (e) => {
    if (over === "0" && e.target.innerText === "") {
      e.target.innerText = turn;
      setTurn(turn === "X" ? "O" : "X");
      e.target.style.color = turn === "O" ? "red" : "blue";
      //   console.log(e.target.innerText, over);
      checkWin();
    }
  };

  const checkWin = () => {
    let boxtext = document.getElementsByClassName("colomn");
    let win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    win.forEach((m) => {
      if (
        over === "0" &&
        boxtext[m[0]].innerText === boxtext[m[1]].innerText &&
        boxtext[m[1]].innerText === boxtext[m[2]].innerText &&
        boxtext[m[0]].innerText !== ""
      ) {
        setOver("1");
        // console.log("game over");
        document.querySelector("#over").style.display = "flex";
        document.querySelector(".yellow").style.backgroundColor = "yellow";
        document.querySelector("#over").style.color =
          turn === "O" ? "red" : "blue";

          
        let col = turn === "O" ? "rgb(102, 55, 234)" : "rgb(234, 55, 186)";
        boxtext[m[1]].style.background = col;
        boxtext[m[0]].style.background = col;
        boxtext[m[2]].style.background = col;
      }
    });
  };

  const handleReset = () => {
    let boxes = document.getElementsByClassName("colomn");
    Array.from(boxes).forEach((m) => {
      m.innerText = "";
      m.style.background = "local";
      //   m.style.backgroundColor = props.mode === "light" ? "white" : "rgb(3, 0, 36)";
    });
    setOver("0");
    setTurn("X");
    document.querySelector("#over").style.display = "none";
    document.querySelector(".yellow").style.background = "local";
  };

  const iN = (event) => {
    if(over !== "1") {
      event.target.style.backgroundColor = "rgb(109, 109, 243)";
      // event.target.style.backgroundColor = "yellowgreen";
    }
  };

  const ouT = (event) => {
    if (over === "0") {
      event.target.style.background = "local";
    }
  };

  return (
    <div className="container" >
      <h1 className="head">Let us Play The Game : Tic-Tac-Toe</h1>
      <div className="grid">
        <div className="row">
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g2"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g3"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
        </div>
        <div className="row">
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
        </div>
        <div className="row">
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
          <button
            className="colomn"
            id="g1"
            onClick={handleGame}
            style={css}
            onMouseEnter={iN}
            onMouseLeave={ouT}
          ></button>
        </div>

        <div className="yellow">
          <div id="over" className="">
            <h1>
              <strong id="hey"> {turn === "X" ? "O" : "X"}</strong> Won the
              Game
            </h1>
            {/* <Image src={img} alt="GAME IS OVER" /> */}
            <Image src={img} alt="WON" width={400} height={500} />
          </div>
          <button className="reset" onClick={handleReset}>
            Reset The Game & Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return null;
}