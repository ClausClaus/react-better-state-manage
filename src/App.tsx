import React, { useReducer, useEffect } from 'react';
import { dogReducer, initialState } from './state';

const App: React.FC = () => {
    const [state, dispatch] = useReducer(dogReducer, initialState);
    const { error, dog, status } = state;

    useEffect(() => {
        if (state.status === 'loading') {
            let canceled = false;

            fetchRandomDog()
                .then(data => {
                    if (canceled) return;
                    dispatch({ type: 'RESOLVE', data });
                })
                .catch(error => {
                    if (canceled) return;
                    dispatch({ type: 'REJECT', error });
                });

            return () => {
                canceled = true;
            };
        }
    }, [state.status]);

    const fetchRandomDog = () =>
        fetch(`https://dog.ceo/api/breeds/image/random`).then(data =>
            data.json()
        );

    return (
        <div>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <figure
                className="dog"
                onDoubleClick={() => dispatch({ type: 'FETCH' })}
            >
                {dog && <img src={dog} alt="doggo" />}
            </figure>

            <button onClick={() => dispatch({ type: 'FETCH' })}>
                {status === 'loading' ? 'Fetching...' : 'Fetch dog!'}
            </button>
            <button onClick={() => dispatch({ type: 'CANCEL' })}>Cancel</button>
        </div>
    );
};

export default App;
