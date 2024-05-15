import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)

/*
  The useSyncExternalStore hook is used to synchronize the external store (store) with a React component.
  It takes three arguments:
  - A subscription function (store.subscribe in our case) to listen for changes in the external store.
  - A function to get the current value of the store (store.value).
  - An initial value for the store (also store.value in our case).

  Whenever the external store (store) updates, useSyncExternalStore automatically triggers a re-render of the component with the latest state.
*/