import {useState} from "react";

interface Created {
    initialValue: any;
}

export default ({initialValue}: Created) => {
    const [data, setDate] = useState(initialValue)

    const handle = (e: any): void => {
        const {value, name} = e.target;
        setDate({
            ...data,
            [name]: value
        })
    }

    return [data, handle]
}