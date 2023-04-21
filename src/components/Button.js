function Button({type, className, text, value, action}){
    return(
        <button type="button"
                className={`${className} ${type}`}
                // In the parent component, action() prop has a value of handleClick()
                // onClick, action() will be called with 'type', 'text', and 'value' as its arguments
                // the arguments will be receieved by handleClick() up in the parent component its parameters
                onClick={() => action(type, text, value)}>
            {text}
        </button>
    )
}

export default Button