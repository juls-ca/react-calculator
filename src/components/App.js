import { useState } from 'react';
import Header from './Header';
import Display from './Display';
import Button from './Button';
import Footer from './Footer';
import calculatorButtons from '../globals/button-data.js';
import '../scss/index.scss';
import NotesForUse from './NotesForUse';


function App() {

  // STATES
  const [display, setDisplay] = useState('');
  const [calcStr, setCalcStr] = useState('');
  const [memoryStr, setMemoryStr] = useState('');
  const [prevBtnType, setPrevBtnType] = useState('');
  
  // FUNCTIONS
  function handleClick(btnType, btnText, btnValue){

    switch(btnType){
      case 'number':
        btnIsNumber(btnText);
        break;
      case 'operator':
        btnIsOperator(btnText);
        break;
      case 'clear':
        btnIsClear(btnValue);
        break;
      case 'enter':
        btnIsEnter(btnText);
        break;
      case 'memory':
        btnIsMemory(btnValue);
        break;
      case 'decimal':
        btnIsDecimal();
        break;
      case 'sign':
        btnIsSign();
        break;
      default:
        break;
    }
  }

  function btnIsNumber(btnText){
    // checks if current number input is a continuation of first or second num string to be evaluated
    setDisplay(prevBtnType === 'operator' ? `${btnText}` : `${display}${btnText}`);
    
    setCalcStr(`${calcStr}${btnText}`);
    setPrevBtnType('number');
  }

  function btnIsOperator(btnText, btnValue) {
    // ensures operator is not followed by another operator
    if (prevBtnType !== 'operator' && (btnText !== '%' && btnText !== '\u221a')){
      // this ensures only the operand symbol is displayed
      setDisplay(btnText);

      // DIVIDE & MULTIPLY ------------------------------
      // replace unicodes with JS-recognized symbols
      if (btnText === '\u00f7'){
        btnText = '/';
      }
      else if (btnText === '\u00d7'){
        btnText = '*';
      }

      // adds recognized symbols to calc string
      // for ALL operatots except percent and square root
      setCalcStr(`${calcStr}${btnText}`);
      setPrevBtnType('operator');
    }  

    // PERCENT & SQUARE ROOT --------------------------
    // prevBtnType is not set to 'operator' in order to run 'enter' btn functionality
    if(btnText === '%'){
      setDisplay(btnText);
      let strToEval = calcStr.slice(0);
      setCalcStr(strToEval/100);
            
      if (btnValue === 'Enter'){
        setDisplay(calcStr.toString());
      }
    }
    else if (btnText === '\u221a'){
      setDisplay(`${btnText}${display}`);
      let strToEval = calcStr.slice(0);
      setCalcStr(strToEval ** 0.05);
            
      if (btnValue === 'Enter'){
        setDisplay(calcStr.toString());
      }
    }
      
  }
    
  function btnIsClear(btnValue) {
    if (btnValue === 'All Clear'){
      setDisplay('');
      setCalcStr('');
    }
    else if (btnValue === 'Clear'){
      setCalcStr(calcStr.slice(0, -(display.length)));
      setDisplay('');
    }

    setPrevBtnType('clear');
  }

  function btnIsEnter(btnText) {
    if(prevBtnType !== 'operator'){
      let result = new Function('return ' + calcStr)();
      setDisplay(parseFloat(result.toFixed(8)).toString());
      setCalcStr(parseFloat(result.toFixed(8)).toString());
    }
    // Display 'Err' for incomplete calcStr string
    else {
      setDisplay('Err');
    }

    setPrevBtnType('enter');
  }

  function btnIsMemory(btnValue){
    if (btnValue === 'Memory Save'){
      // stores display string to memory string & resets display
      // memory string is not added to the calcStr string
      setMemoryStr(display);
      setDisplay('');
      setCalcStr(calcStr.slice(0, -(display.length)));
    }
    else if (btnValue === 'Memory Recall'){
      setDisplay(memoryStr);
      setCalcStr(`${calcStr}${memoryStr}`);
    }
    else if (btnValue === 'Memory Addition'){
      if (memoryStr !== ''){
        let result = new Function('return ' + `${memoryStr}+${display}`)();
        setDisplay(result.toString());
      } else {
        // Display error if memoryStr is empty
        setDisplay('Err. No Memory.');
      }
      setCalcStr('');
    }
    else if (btnValue === 'Memory Subtract'){
      if(memoryStr !== ''){
        let result = new Function('return ' + `${memoryStr}-${display}`)();
        setDisplay(result.toString());
      }
      else {
        // Display error if memoryStr is empty
        setDisplay('Err. No Memory.');
      }
      setCalcStr('');
    }
    else if(btnValue === 'Memory Clear'){
      setMemoryStr('');
    }

    setPrevBtnType('memory');
  }

  function btnIsDecimal(){
    // prevents multiple decimal points in a number string
    if(display.includes('.')){
      setDisplay(display);
    }
    else {
      // screen displays 0 on empty display state
      // on decimal click, assume user means '0.###'
      setCalcStr(display === '' ? '0.' : `${calcStr}.`);
      setDisplay(display === '' ? '0.' : `${display}.`);
    }

    setPrevBtnType('decimal');
  }

  function btnIsSign(){
    // check if the first character is a negative sign
    // If it is, start string at the second character
    if (display[0] === '-'){
      setDisplay(display.substring(1));
      setCalcStr(display.substring(1));
    }
    else {
      setDisplay(`-${display}`);
      setCalcStr(`-${display}`)
    }
  }
  

  // ------------------------------------------------------------------

  return (
    <div className="wrapper">
      <Header />

      <div className='calc-wrapper'>
        <Display digits={display} />

        <div className='buttons-wrapper'>
        {/* map() will iterate over calculatorButtons array, creating btn components with props*/}
        {calculatorButtons.map((btn,i) =>
        <Button key={i}
                type={btn.type}
                className={btn.className}
                text={btn.text}
                value={btn.value}
                action={handleClick}
        /> )}
        </div>
      </div>
      <NotesForUse /> 

      <Footer />
    </div>
  );
}

export default App;
