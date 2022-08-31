import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ModalStyled from "./ModalStyled";

const Modal = (): JSX.Element => {
  const { isVisible, message, type } = useAppSelector(
    (state: RootState) => state.uiModal
  );

  return (
    <>
      {isVisible && (
        <ModalStyled data-testid="modal">
          <div className="modal__content">
            <div className="clock"></div>
            <span className={`modal__message modal__message--${type}`}>
              {message}
            </span>
          </div>
        </ModalStyled>
      )}

      {!isVisible && <></>}
    </>
  );
};
export default Modal;
