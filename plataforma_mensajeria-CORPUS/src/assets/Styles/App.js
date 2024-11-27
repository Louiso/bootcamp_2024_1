import styled from "styled-components";

export const Secction = styled.section`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

export const ContenedorBtn = styled.div`
    display: flex;
    justify-content: ${(p)=>(p.$JsCtEnd ? 'end' : 'center')};
    margin-top: 1em;
    gap: .5em;

`;
export const Button = styled.button`
    padding: 1em;
    border-radius: 7px;
    outline: none;
    border: 1px solid transparent;
    background-color: ${(Button)=>(Button.$ButtonColor ? '#0056d9' : '#f2f2f2' )};
    color: ${(Button)=>(Button.$ButtonColor ? '#f2f2f2' : '#0056d9' )};
    outline: 1px solid ${(Button)=>(Button.$ButtonColor ? '#f2f2f2' : '#0056d9' )}; ;
    font-size:1rem;
    cursor: pointer;
    transition: all 0.3s ease;
        &:hover {
                    background-color: ${(Button)=>(Button.$ButtonColor ? '#0056b3' : 'transparent' )};  ; }
        &:active {
                    border: 1px solid #004494;
                }
`;
                
