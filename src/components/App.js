import { useState } from 'react';
import Header from './Header';
import Display from './Display';
import Button from './Button';
import Footer from './Footer';
import calculatorButtons from '../globals/calculator-bonus-03-button-data.js';
import '../scss/index.scss';


function App() {

  // STATES
  const [display, setDisplay] = useState('');
  const [calculation, setCalculation] = useState('');
  const [prevBtnType, setPrevBtnType] = useState('');
  const [memoryStr, setMemoryStr] = useState('');
  
  // FUNCTIONS
  function handleClick(btnType, btnText, btnValue){

    switch(btnType){

      // NUMBER -----------------------------------------------
      case 'number':
        // clears the screen to only display the number string
        setDisplay(prevBtnType === 'operator' ? `${btnText}` : `${display}${btnText}`);
        setCalculation(`${calculation}${btnText}`);
        
        setPrevBtnType('number');
        break;

      // OPERATOR --------------------------------------------
      case 'operator':
      // ensures operator is not followed by another operator
      if (prevBtnType !== 'operator'){
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
        setCalculation(`${calculation}${btnText}`);
  
        // PERCENT & SQUARE ROOT --------------------------
        if(btnText === '%'){
          let result = new Function('return ' + `${display}/100`)();
          result = parseFloat(result.toFixed(8));
          setDisplay(result.toString());
          setCalculation(result.toString());
        }
        else if (btnText === '\u221a'){
          let result = new Function('return ' + `${display} ** 0.5`)();
          result = parseFloat(result.toFixed(8));
          setDisplay(result.toString());
          setCalculation(result.toString());
        }
      }  
        
      setPrevBtnType('operator');
      break;

      // CLEAR -----------------------------------------------
      case 'clear':
        if (btnValue === 'All Clear'){
          setDisplay('');
          setCalculation('');
        }
        else if (btnValue === 'Clear'){
          setCalculation(calculation.slice(0, -(display.length)));
          setDisplay('');
        }

        setPrevBtnType('clear');
        break;

      // ENTER -----------------------------------------------
      case 'enter':
        if(prevBtnType !== 'operator'){
          let result = new Function('return ' + calculation)();
          setDisplay(parseFloat(result.toFixed(8)).toString());
          setCalculation(parseFloat(result.toFixed(8)).toString());
        }
        // Display 'Err' for incomplete calculation string
        else {
          setDisplay('Err');
        }

        setPrevBtnType('enter');
        break;

      // MEMORY ----------------------------------------------
      case 'memory':
        if (btnValue === 'Memory Save'){
          // stores display string to memory string & resets display
          // memory string is not added to the calculation string
          setMemoryStr(display);
          setDisplay('');
          setCalculation(calculation.slice(0, -(display.length)));
        }
        else if (btnValue === 'Memory Recall'){
          setDisplay(memoryStr);
          setCalculation(`${calculation}${memoryStr}`);
        }
        else if (btnValue === 'Memory Addition'){
          if (memoryStr !== ''){
            let result = new Function('return ' + `${memoryStr}+${display}`)();
            setDisplay(result.toString());
          } else {
            // Display error if memoryStr is empty
            setDisplay('Err. No Memory.');
          }
          setCalculation('');
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
          setCalculation('');
        }
        else if(btnValue === 'Memory Clear'){
          setMemoryStr('');
        }

        setPrevBtnType('memory');
        break;

      // DECIMAL ----------------------------------------------
      case 'decimal':
        // prevents multiple decimal points in a number string
        if(display.includes('.')){
          setDisplay(display);
        }
        else {
          // screen displays 0 on empty display state
          // on decimal click, assume user means '0.###'
          setCalculation(display === '' ? '0.' : `${calculation}.`);
          setDisplay(`${display}.`);
        }
        setPrevBtnType('decimal');
        break;

      // SIGN -------------------------------------------------
      case 'sign':
        // check if the first character is a negative sign
        // If it is, start string at the second character
        if (display[0] === '-'){
          setDisplay(display.substring(1));
          setCalculation(display.substring(1));
        }
        else {
          setDisplay(`-${display}`);
          setCalculation(`-${display}`)
        }
        break;

      default:
        break;
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

      <Footer />
    </div>
  );
  
}

export default App;
