/**
 * --------------- 使用 reducer 进行状态管理 ---------------
*/

// import React, { useReducer, useEffect } from "react";
// import { dogReducer, initialState } from "./state";

// const App: React.FC = () => {
//   const [state, dispatch] = useReducer(dogReducer, initialState);
//   const { error, dog, status } = state;

//   useEffect(() => {
//     if (state.status === "loading") {
//       let canceled = false;

//       fetchRandomDog()
//         .then(data => {
//           if (canceled) return;
//           dispatch({ type: "RESOLVE", data });
//         })
//         .catch(error => {
//           if (canceled) return;
//           dispatch({ type: "REJECT", error });
//         });

//       return () => {
//         canceled = true;
//       };
//     }
//   }, [state.status]);

//   const fetchRandomDog = () =>
//     fetch(`https://dog.ceo/api/breeds/image/random`).then(data => data.json());

//   return (
//     <div>
//       {error && <span style={{ color: "red" }}>{error}</span>}
//       <figure className="dog" onDoubleClick={() => dispatch({ type: "FETCH" })}>
//         {dog && <img src={dog} alt="doggo" />}
//       </figure>

//       <button onClick={() => dispatch({ type: "FETCH" })}>
//         {status === "loading" ? "Fetching..." : "Fetch dog!"}
//       </button>
//       <button onClick={() => dispatch({ type: "CANCEL" })}>Cancel</button>
//     </div>
//   );
// };

/**
 * --------------- 使用 x-state 进行状态管理 ---------------
*/

import React from 'react';
import { dogFetcherMachine } from './x-state';
import { useMachine } from '@xstate/react';

const App: React.FC = () => {
  const [current, send] = useMachine(dogFetcherMachine);
  const { error, dog } = current.context;

  return (
    <div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
      <figure className="dog" onDoubleClick={() => send('FETCH')}>
        {dog && <img src={dog} alt="doggo" />}
      </figure>

      <button onClick={() => send('FETCH')}>
        {current.matches('loading') && 'Fetching...'}
        {current.matches('success') && 'Fetch another dog!'}
        {current.matches('idle') && 'Fetch dog'}
        {current.matches('failure') && 'Try again'}
      </button>
      <button onClick={() => send('CANCEL')}>Cancel</button>
    </div>
  );
};

export default App;
