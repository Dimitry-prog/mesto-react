import React from "react";

const PopupWithForm = ({
                         name,
                         title,
                         isOpenPopup,
                         handleClosePopups,
                         submitText,
                         children
}) => {

  return (
    <div className={isOpenPopup ? `pop-up pop-up_${name} pop-up_opened` : `pop-up pop-up_${name}`}>
      <div className="pop-up__overlay">
        <button
          onClick={handleClosePopups}
          className={`button button_type_close-profile pop-up__close`} type="button" aria-label="ClosePopUp"
        >
        </button>
        <form className="form form_type_profile pop-up__form" name={`pop-up-form-${name}`} noValidate>
          <h3 className="form__title">{title}</h3>
          {children}
          <button type="submit" className="button button_type_submit">{submitText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;