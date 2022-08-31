import ModalStyled from "./ModalStyled";

const Modal = (): JSX.Element => (
  <ModalStyled>
    <div className="modal__content">
      <div className="clock"></div>
      <span className="modal__message">Loading</span>
    </div>
  </ModalStyled>
);

export default Modal;
