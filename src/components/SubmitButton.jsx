import React from "react";
function SubmitButton({ isFormValid, buttonText }) {

    const buttonClassName = `form__button ${isFormValid ? 'form__button_inactive' : ''}`
    return (
        <button className={buttonClassName} type="submit" disabled={isFormValid}>{buttonText}</button>
    )
}

export default SubmitButton;

