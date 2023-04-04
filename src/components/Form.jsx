import React from "react";
import SubmitButton from "./SubmitButton";


function Form(props) {

    return (
        <form className="form" name={props.name}>
            <h3 className="form__title">{props.title}</h3>
            {props.children}
            <SubmitButton
                buttonText={props.buttonText}>
            </SubmitButton>
        </form>
    )
}
export default Form;