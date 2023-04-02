import React from "react";
import SubmitButton from "./SubmitButton";

function Form(props){
    return (
        <form name={props.name} className="form" novalidate>
        <h3 className="form__title">{props.title}</h3>

        <input id="name-input" className="form__input  form__input_theme_name" type="text" name="name" value=""
            placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="form__input-error name-input-error"></span>

        <input id="profession-input" className="form__input  form__input_theme_profession" type="text" name="about"
            value="" placeholder="Профессия" required minLength="2" maxLength="200" />
        <span className="form__input-error profession-input-error"></span>
        <SubmitButton buttonText='Сохранить'></SubmitButton>
      
    </form>
    )
}
 export default Form;