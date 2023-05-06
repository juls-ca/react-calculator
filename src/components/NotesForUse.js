import { useState } from 'react';

function NotesForUse() {
  const [btnActive, setBtnActive] = useState(false);

  function handleBtnClick() {
   setBtnActive(!btnActive);
  }
  

  return (
    <div className="accordion">
    <button className="accordion-btn" onClick={handleBtnClick}>
      Notes for use
    </button>

      {/* When btnActive is true, .active class is added*/}
      <section className={`accordion-content ${btnActive ? 'active' : ''}`}>
        <p>Memory Keys:</p>
        <ul>
          <li>Memory Save (MS): Save number in Memory</li>
          <li>Memory Clear (MC): Clear Memory</li>
          <li>Memory Recall (MR): Display and use the number in Memory</li>
          <li>Memory Subtract (M-): Subtract current number to Memory number</li>
          <li>Memory Add (M+): Add current number to Memory number</li>
        </ul>

        <p>Others: </p>
        <ul>
          <li>All Clear (AC) will clear display and math expression to be evaluated</li>
          <li>AC will not erase number in Memory, please use MC</li>
          <li>Clear (C) will only clear currently displayed number</li>
          <li>Incomplete math expressions will result in an error (Err)</li>
        </ul>
      </section>
    </div>
  );
}

export default NotesForUse