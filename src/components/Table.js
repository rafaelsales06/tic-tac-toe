import React from "react";
import { useState } from "react";
import '../styles/Table.css';


export default function Table(){
  
      const gamePlay=[['','',''],['','',''],['','','']];
      const [game, setGame] = useState([['','',''],['','',''],['','','']]);
      const [symbolCurrent,setSymbolCurrent] = useState('X');
      const [playing,setPlaying] = useState(true);
      const [result,setResult] = useState('');
    
      const btnGamePlay=()=>{
          if(!playing){
            return(
              <>
                <h1>{result}</h1>
                <button className='restartbutton' onClick={()=>restart()}>Jogar Novamente</button>
              </>
            )
          }
      }
    
      //verifica se existe algum vencedor
      const verifyWin=()=>{
        //lines
        let point = 0;
        let win = false;
        for(let l=0;l<3;l++){
          point = 0;
          for(let c=0;c<3;c++){
            if(game[l][c]==symbolCurrent){
              point++;
            }
          }
          if(point==3){
            win = true;
          }
        }
    
        //column
        for(let c=0;c<3;c++){
          point = 0;
          for(let l=0;l<3;l++){
            if(game[l][c]==symbolCurrent){
              point++;
            }
          }
          if(point==3){
            win = true;
          }
        }
    
        //diagonals one
        point = 0
        for(let d=0;d<3;d++){
          if(game[d][d]==symbolCurrent){
              point++
          }
        }
        if(point >= 3){
          win = true;
        }
    
        //diagonals two
        point = 0
        let l = 0
        for(let c=2;c>=0;c--){
            if(game[l][c]==symbolCurrent){
              point++
            }
            l++
        }
        if(point >= 3){
          win = true;
        }
    
        return win
      }
    
      //ferifica se o jogo esta empatado
      const verifyTie=()=>{
        let point = 8
        for(let l=0;l<3;l++){
          for(let c=0;c<3;c++){
            if(game[l][c]!==''){
              point = point-1;
            }
          }
        }
        if(point===0){
          setResult("Jogo Empatado")
          setPlaying(false)
        }
      }
    
      //mudando o jogador
      const changePlayer=()=>{
        symbolCurrent == 'X' ? setSymbolCurrent('O'):setSymbolCurrent('X');
      }
    
      //retorna a posição clicada
      const returnPos=(e)=>{
        const p = e.target.getAttribute('data-pos')
        const pos = [parseInt(p.substring(0,1)),parseInt(p.substring(1,2))]
        return pos
      }
    
      //verifica se tem alguma marcação no espaço clicado
      const verifySpace=(e)=>{
        if(game[returnPos(e)[0]][returnPos(e)[1]]==''){
          return true
        }else{
          return false
        }
      }
    
      //adiciona o simbolo atual
      const addSymbol=(e)=>{
        if(playing){
          //verifica o empate
          verifyTie()
          if(verifySpace(e)){
            game[returnPos(e)[0]] [returnPos(e)[1]]=symbolCurrent
            changePlayer()
            //verifica a vitoria
            if(verifyWin()){
              changePlayer()
              setPlaying(false)
              setResult('Jogador '+ symbolCurrent + ' Venceu !!!')
            }
          }else{
            alert('Este espaço não está disponivel, Escolha outro')
          }
        }
      }
    
      const restart=()=>{
        setPlaying(true)
        setGame(gamePlay)
        setSymbolCurrent('X')
      }
    
    
    return( 
        <div>
            <h2>Quem joga: {symbolCurrent}</h2>
        
            <div className="tab">

            <div className="tabLine">
              <div className='home' data-pos="00" onClick={(e)=>addSymbol(e)}>{game[0][0]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="01" onClick={(e)=>addSymbol(e)}>{game[0][1]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="02" onClick={(e)=>addSymbol(e)}>{game[0][2]}</div>
            </div>
    
            <hr className='linefloor'></hr>
    
            <div className="tabLine">
              <div className='home' data-pos="10" onClick={(e)=>addSymbol(e)}>{game[1][0]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="11" onClick={(e)=>addSymbol(e)}>{game[1][1]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="12" onClick={(e)=>addSymbol(e)}>{game[1][2]}</div>
            </div>
    
            <hr className='linefloor'></hr>
    
            <div className="tabLine">
              <div className='home' data-pos="20" onClick={(e)=>addSymbol(e)}>{game[2][0]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="21" onClick={(e)=>addSymbol(e)}>{game[2][1]}</div>
              <hr className='linewall'></hr>
              <div className='home' data-pos="22" onClick={(e)=>addSymbol(e)}>{game[2][2]}</div>
            </div>
    
            <h1 className='title'>Jogo Da Velha</h1>

            {btnGamePlay()}
          
          </div>
        </div>
    )
}