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
  
  // FUNCTIONS
  function handleClick(btnType, btnText, btnValue){

    switch(btnType){

      case 'number':
        if (prevBtnType === 'operator'){
          // this clears the display screen so that only the second number string is displayed
          setDisplay(`${btnText}`);
        }
        else {
          setDisplay(`${display}${btnText}`);
        }

        setCalculation(`${calculation}${btnText}`);
        setPrevBtnType('number');
        break;

      case 'operator':
        if (prevBtnType === 'number' || prevBtnType === 'clear' ){
          // this ensures only the operand symbol is displayed
          setDisplay(`${btnText}`);

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

      case 'enter':
        const result = new Function('return ' + calculation)();
        setDisplay(result.toString());
        setCalculation(result.toString());
        setPrevBtnType('');
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
