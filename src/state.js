export function createStore(initialState) {
  let state = structuredClone(initialState);
  const subscribers = new Set();

  function notify() {
    for (const subscriber of subscribers) {
      subscriber(state);
    }
  }

  return {
    getState() {
      return state;
    },
    setState(nextState) {
      state = {
        ...state,
        ...nextState
      };
      notify();
    },
    subscribe(subscriber) {
      subscribers.add(subscriber);
      subscriber(state);
      return () => {
        subscribers.delete(subscriber);
      };
    }
  };
}

