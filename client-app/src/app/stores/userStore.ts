import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../../models/user";
import agent from "./../api/agent";
import { store } from "./store";
import { history } from "../..";
export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get IsLoggedIn() {
    return !!this.user;
  }

  login = async (credential: UserFormValues) => {
    try {
      const user = await agent.Account.login(credential);
      store.commonStore.setToken(user.token);
      console.log(user);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = async () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
    store.modalStore.closeModal();
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  register = async (credential: UserFormValues) => {
    try {
      const user = await agent.Account.register(credential);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
}
