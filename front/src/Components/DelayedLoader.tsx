import { useState, useEffect } from 'react';
import LoadingPosts from './LoadingPosts';

function DelayedSpinner({ delay }:{delay:number}) {
    const [showSpinner, setShowSpinner] = useState(false);

    console.log('showSpinner', showSpinner)
    useEffect(() => {

        console.log('delayed useeffect')
        const timerId = setTimeout(() => {
            setShowSpinner(true);
        }, delay);

        return () => {
            clearTimeout(timerId);
        };
    }, [delay]);

    return showSpinner && <LoadingPosts />;
}

export default DelayedSpinner;
