import React from "react";
function SubmitButton(props) {
   
   const buttonClassName = `form__button ${props.isFormValid ? 'form__button_inactive' : ''}`
    return (
        <button  className={buttonClassName} type="submit" disabled={props.isFormValid}>{props.buttonText}</button>
    )
}

export default SubmitButton;

