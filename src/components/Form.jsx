import React from "react";
import SubmitButton from "./SubmitButton";


function Form(props) {

    return (
        <form className="form" name={props.name} onSubmit={props.onSubmit} >
            <h3 className="form__title">{props.title}</h3>
            {props.children}
            <SubmitButton 
            buttonText={props.buttonText}
            isFormValid={props.isFormValid}
           />
        </form>
    )
}
export default Form;