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

const initialState = {
  origin: {
    lat: -0,
    long: -0,
  },
  destiny: {
    lat: 0,
    long: 0,
  },
};

const { state$, updateState, getCurrentState } = storeFactory(initialState);

const setOrigin = (origin) => {
  updateState(({ state }) => ({ origin: origin }));
};

const setDestiny = (destiny) => {
  updateState(({ state }) => ({ origin: destiny }));
};

const resetState = () => {
  updateState({ initialState });
};

const state = state$.asObservable();

const actions = {
  setOrigin,
  setDestiny,
  resetState,
};

export { storeFactory, actions, state };
