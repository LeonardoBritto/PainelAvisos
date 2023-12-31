import './Input.css'

function Input({type, text, name, placeholder, handleOnChange, value, multiple}){
    return(
        <div className='form_control'>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                defaultValue={value}
                {...(multiple ? {multiple} : '')}
            />
        </div>
    )
}

export default Input