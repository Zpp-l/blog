import {useEffect, useState} from "react";

export default function useLoaded() {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        setIsLoaded(true)
        let timer = setTimeout(() => {
            setIsLoaded(false)
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [isLoaded])
    return isLoaded
}
