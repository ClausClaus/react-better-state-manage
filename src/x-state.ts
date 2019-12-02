import { Machine, assign } from 'xstate';

const fetchRandomDog = () =>
  fetch(`https://dog.ceo/api/breeds/image/random`).then(data => data.json());

export const dogFetcherMachine = Machine<any>({
  id: 'dog fetcher',
  initial: 'idle',
  context: {
    dog: null,
    error: null
  },
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      invoke: {
        src: () => fetchRandomDog(),
        onDone: {
          target: 'success',
          actions: assign({ dog: (_, event) => event.data.message })
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_, event) => event.data })
        }
      },
      on: { CANCEL: 'idle' }
    },
    success: {
      on: { FETCH: 'loading' }
    },
    failure: {
      on: { FETCH: 'loading' }
    }
  }
});
