
function Display({ digits }){
    return (

        // ternary operator
        // (condition) ? (true) : (false)
        
        <div className='display'>
            {digits === '' ? '0' : digits}
        </div>
    )
}

export default Display;