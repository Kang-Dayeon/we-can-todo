import React from "react";
import {styled} from "styled-components";
import {Link} from "react-router-dom";

// ** props interface **
interface props {
    link: string,
    children: string
}

// ** Styled-Component **
const LinkWrap = styled.div`
    margin-top: 10px;
    text-align: center;
`
const StyledLink = styled(Link)`
    font-size: 14px;
    color: #feca3c;
`

function Anchor(props: props){
    const children = props.children
    const link = props.link
    return (
        <LinkWrap>
            <StyledLink to={link}>
                {children}
            </StyledLink>
        </LinkWrap>
    )
}

export default Anchor