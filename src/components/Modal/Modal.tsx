import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setVisibilityActionCreator } from "../../store/slices/uiModal/uiModalSlice";
import ModalStyled from "./ModalStyled";

const Modal = (): JSX.Element => {
  const {
    isVisible,
    message,
    type,
    isClosing: isLoading,
  } = useAppSelector((state: RootState) => state.uiModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisible && isLoading) {
      setTimeout(() => {
        dispatch(setVisibilityActionCreator(false));
      }, 2250);
    }
  }, [dispatch, isVisible, isLoading]);

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
