import { useState, useEffect, useMemo } from 'react';

function useFetch<Payload>(url: string):{
    data: Payload | null;
    done: boolean;
} {
    const [data, setData] = useState<Payload | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((d: Payload) => {
                setData(d);
                setDone(true);
            })
    }, [url])

    return {data,done}
}


function SomeComponent(){
    interface IProduct{
        name: string;
        type: string;
    }
    const { data, done } = useFetch<IProduct[]>('some-url');
    const snowboards = useMemo(() => {
        return data?.filter((product) => product.type === 'snowboards');
    }, [data]);
    return (
        // TSX
    )
}