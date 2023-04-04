import React from "react";
function SubmitButton(props) {

    return (
        <button className="form__button" type="submit">{props.buttonText}</button>
    )
}

export default SubmitButton;
