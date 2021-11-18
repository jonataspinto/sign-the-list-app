import { ISubscriber } from "../../../types/IList";

export type IAuthState = {
  isAuthenticated?: boolean;
  loadingAuth?: boolean;
  user: ISubscriber;
}
