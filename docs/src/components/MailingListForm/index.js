import React from 'react';

import classnames from 'classnames';

import './styles.css';

function MailingListForm({block, buttonClass, center, description, size, width}) {
  return (
    <div className={classnames('mailing-list', {'mailing-list--block': block, 'mailing-list--center': center, [`mailing-list--${size}`]: size})}>
      {description !== false && (
        <div className="mailing-list--description">
          The easiest way to stay up-to-date. One email on the 1st of every month. No spam, ever.
        </div>
      )}
      <form action="https://8ff00905.sibforms.com/serve/MUIEAGomkTPvCSxHpnNSwyrXjMegJD1YOuhPJiudZt-pEQg4Isx5dpSEKyKWeaOk64aPFtYUAEr1qqmQOCDBz6VSGfuX8afhiMMeYlBG398B_o8O2UNlgkgdil548ZsxZOfWXeFSVtR7Mqn95v0f5idA7NWYLUV60B2N_P2J4BD4M18W2cnW6qZ9H9ntuSuhl-9T7kef2hw6WbSk" method="post" className="mailing-list--form">
        <input className={classnames('input', `input--${size}`)} name="EMAIL" placeholder="you@email.com" type="email" style={{width: width}} required />
        <button className={classnames('button', `button--${buttonClass || 'primary'}`, `button--${size}`)} type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default MailingListForm;
