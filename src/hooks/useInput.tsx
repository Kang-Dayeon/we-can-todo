import React, {useState} from "react";

function useInput<T>(initialValue: T) {
    const [data, setDate] = useState(initialValue)

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setDate({
            ...data,
            [name]: value
        })
    }

    return [data, handle]
}

export default useInput