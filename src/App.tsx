import React, { useState } from 'react';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dog, setDog] = useState<null | string>(null);
    const fetchDog = () => {
        setIsLoading(true);
        fetch(`https://dog.ceo/api/breeds/image/random`)
            .then(data => data.json())
            .then(response => {
                setDog(response.message);
                setIsLoading(false);
            });
    };
    return (
        <div>
            <figure className="dog">
                {dog && <img src={dog} alt="doggo" />}
            </figure>
            <button disabled={isLoading} onClick={fetchDog}>
                {isLoading ? 'Fetching...' : 'Fetch dog!'}
            </button>
        </div>
    );
};

export default App;
