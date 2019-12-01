import React, { useState } from 'react';

/**
 *  这种方式在开发中经常被使用，但是如果需求是点击图片也可以发送获取狗狗的图片请求呢！或者其他
 * 任何地方都可能要触发获取狗狗请求，isLoading这个状态将会越写越多。
 * 最终导致函数颗粒度过于分散，状态难以集中管理
 */

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dog, setDog] = useState<null | string>(null);
    /**
     * 增加功能复杂性
     *  获取狗狗失败，将显示错误
     *  获取狗狗可以取消
     */
    const [canceled, setCanceled] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomDog = () => {
        setIsLoading(true);
        return fetch(`https://dog.ceo/api/breeds/image/random`).then(data =>
            data.json()
        );
    };

    const fetchDog = () => {
        setCanceled(false);
        setError(null);
        setIsLoading(true);

        fetchRandomDog()
            .then(response => {
                // 这里的if判断应该可以工作...但是不能！
                if (canceled) return;

                setIsLoading(false);
                setDog(response.message);
            })
            .catch(error => {
                setIsLoading(false);
                setCanceled(false);
                setError(error);
            });
    };

    const cancel = () => {
        setIsLoading(false);
        setCanceled(true);
    };

    return (
        <div>
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <figure className="dog" onDoubleClick={fetchDog}>
                {dog && <img src={dog} alt="doggo" />}
            </figure>
            <button disabled={isLoading} onClick={fetchDog}>
                {isLoading ? 'Fetching...' : 'Fetch dog!'}
            </button>
            <button onClick={cancel}>Cancel</button>
        </div>
    );
};

export default App;
