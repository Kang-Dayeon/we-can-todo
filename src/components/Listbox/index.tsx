import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding: 20px 0 0;
    width: 100%;
    height: auto;
`

const StyledTitle = styled.h2`
    font-size: 14px;
    font-weight: bold;
`

const StyledListBox = styled.div`
    width: 100%;
    height: auto;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
`

function ListBox (props:any) {
    const {children, title} = props
    return (
        <StyledWrapper>
            <StyledTitle>
                {title}
            </StyledTitle>
            <StyledListBox>
                {children}
            </StyledListBox>
        </StyledWrapper>
    )
}

export default ListBox;