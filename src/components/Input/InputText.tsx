import React from "react";
import {styled} from "styled-components";

// ** props type **
type onChange = (e: React.ChangeEvent<HTMLInputElement>) => void

// ** props interface **
interface props {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: onChange,
    children: string,
    nullValue : boolean,
}

// ** Styled-Component **
const Input = styled.input<{nullValue:string}>`
    display: block;
    margin: 10px 0 0;
    padding: 10px 15px;
    border: ${(props) => (props.nullValue === 'true') ? '1px solid #fff' : 'none'};
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 14px;
    &::placeholder{
        color: #fff;
    }
`
const Validation = styled.p<{nullValue:string}>`
    display: ${(props) => (props.nullValue === 'true') ? 'block' : 'none'};
    padding: 5px 10px 0;
    font-size: 11px;
    color: #fff;
`

function InputText(props: props){
    return (
        <>
            <Input
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                nullValue={props.nullValue.toString()}
            />
            <Validation nullValue={props.nullValue.toString()}>
                {props.children}
            </Validation>
        </>
    )
}

export default InputText