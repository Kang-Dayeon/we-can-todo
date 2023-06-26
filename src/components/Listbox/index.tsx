import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding: 20px 0 0;
    width: 100%;
    height: auto;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: scroll;
`

const StyledTitle = styled.h2`
    font-size: 18px;
    font-weight: bold;
`

function ListBox (props:any) {
    const {children, title} = props
    return (
        <StyledWrapper>
            <StyledTitle>{title}</StyledTitle>
            {children}
        </StyledWrapper>
    )
}

export default ListBox;