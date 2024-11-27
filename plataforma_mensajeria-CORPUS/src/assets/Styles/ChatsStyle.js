import styled from "styled-components";

export const ContentBtnChanelN = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    outline: 1px solid blue;

    & > div {
        margin-bottom: 10px; 
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center; 
    width: 100%;
    gap: 1em;
`;

export const SecctionChats = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 320px;
    min-width: 100%;
`;

export const FormChats = styled.form`
    padding: 1.5em;
    border-radius: 15px;
    background: #f2f2f2;
    box-shadow:  7px 7px 14px #d9d9d9,
                -7px -7px 14px #e7e7e7;
`;  


export const ContenedorInputChats  = styled.div`
    margin-bottom: .6em;
`;

export const InputsChats = styled.input`
    width: 100%;
    border: none;
    padding: .4em;
    border-radius: 7px;
`;


export const StyledTextArea = styled.textarea`
    width: 100%; 
    padding: .7em; 
    border: none;
    border-radius: 7px;
    resize: vertical; 
    overflow: auto;
`;