import React from "react";
import SubmitButton from "./SubmitButton";


function Form({ title, name, buttonText, isFormValid, children, onSubmit }) {

    return (
        <form className="form" name={name} onSubmit={onSubmit} >
            <h3 className="form__title">{title}</h3>
            {children}
            <SubmitButton
                buttonText={buttonText}
                isFormValid={isFormValid} />
        </form>
    )
}
export default Form;