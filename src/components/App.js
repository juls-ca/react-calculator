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
        if (prevBtnType === 'operator'){
          // this clears the display screen so that only the second number string is displayed
          setDisplay(btnText);
        }
        else {
          setDisplay(`${display}${btnText}`);
        }

        setCalculation(`${calculation}${btnText}`);
        setPrevBtnType('number');
        break;


      // OPERATOR --------------------------------------------
      case 'operator':
        if (prevBtnType === 'number' || prevBtnType === 'clear' || prevBtnType === 'enter'){
          // this ensures only the operand symbol is displayed
          setDisplay(btnText);

          // for the calculation string, any unicodes need to be replaced by operator symbols that JavaScript will recognize
          if (btnText === '\u00f7'){
            btnText = '/';
          }
          else if (btnText === '\u00d7'){
            btnText = '*';
          }

          // this adds the operand to the calculation string as the operand symbol JavaScript will recognize 
          setCalculation(`${calculation}${btnText}`);
        }
        setPrevBtnType('operator');
        break;


      // CLEAR -----------------------------------------------
      case 'clear':
        if (btnValue === 'All Clear'){
          setDisplay('');
          setCalculation('');
          setMemoryStr('');
        }
        else if (btnValue === 'Clear'){
          setCalculation(calculation.slice(0, -(display.length)));
          setDisplay('');
        }
        setPrevBtnType('clear');
        break;


      // ENTER -----------------------------------------------
      case 'enter':
        let result = new Function('return ' + calculation)();
        setDisplay(result.toString());
        setCalculation(result.toString());
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
        if(display === ''){
          setDisplay('0.');
        }
        setDisplay(`${display}.`);
        setCalculation(`${calculation}.`);
        setPrevBtnType('decimal');
        break;

      // SIGN -------------------------------------------------
      case 'sign':
        // check if the first character is a negative sign. If it is, start string at the second character.
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
