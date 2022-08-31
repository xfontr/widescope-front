export type ModalTypes = "loading" | "error" | "success";

export interface ClosePayload {
  message: string;
  type: ModalTypes;
}
