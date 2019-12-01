import React, { useState } from 'react';

/**
 *  这种方式在开发中经常被使用，但是如果需求是点击图片也可以发送获取狗狗的图片请求呢！或者其他
 * 任何地方都可能要触发获取狗狗请求，isLoading这个状态将会越写越多。
 * 最终导致函数颗粒度过于分散，状态难以集中管理
 */

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
