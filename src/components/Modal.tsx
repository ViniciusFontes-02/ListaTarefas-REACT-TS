// css
import styles from "./Modal.module.css";

import React from "react";

interface Props {
  // dizendo que vai usar jsx dentro do children
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const closeModal = (e: React.MouseEvent): void => {
    e.preventDefault();
    const modal = document.querySelector("#modal");

    // ! -> diz que o elemento vem com certeza
    modal!.classList.add("hide");
  };

  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>

      <div className={styles.modal}>
        <h2>Texto modal</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
