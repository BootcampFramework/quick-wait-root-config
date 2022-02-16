import { BehaviorSubject } from "rxjs";
import { cloneDeep } from "lodash";

// StoreFactory

function storeFactory(initialState) {
  const state$ = new BehaviorSubject(Object.assign({}, initialState));

  const updateState = (request) => {
    const isFuction = request instanceof Function;
    const currentState = cloneDeep(state$.getValue());
    const newKeys = isFuction ? request(currentState) : request;

    state$.next({
      ...currentState,
      ...newKeys,
    });
  };
  const getCurrentState = () => state$.getValue();

  return {
    state$,
    updateState,
    getCurrentState,
  };
}

const initialState = {};

const { state$, updateState, getCurrentState } = storeFactory(initialState);

const setHospitalList = (hospitalList) => {
  updateState(({ state }) => hospitalList);
};

const resetState = () => {
  updateState({ initialState });
};

const state = state$.asObservable();

const actions = {
  setHospitalList,
  resetState,
};

export { storeFactory, actions, state };

export function emitEvent(name, data) {
  window.dispatchEvent(new CustomEvent(name, { detail: data }));
}

export function listenEvent(name, cb) {
  window.addEventListener(name, cb);
}
