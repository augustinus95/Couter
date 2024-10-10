import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #292c34;
    align-items: center;
`
const Screen = styled.div`
    min-width: 500px;
    min-height: 35vh;
    border: 1px solid #68ddf0;
    color: #68ddf0;
    background-color: #292c34;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
`
const Settings = styled.div`
    border: 1px solid #68ddf0;
    border-radius: 10px;
    min-height: 99px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
    flex-grow: 1;
`
const Buttons = styled.div`
    border: 1px solid #68ddf0;
    border-radius: 10px;
    min-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px
`
const Button = styled.button`
    background-color: #292c34;
    color: #68ddf0;
    opacity: 0.5;
    font-size: 40px;
    border-radius: 5px;

    &:hover {
        opacity: 1;
    }
`
const Info = styled.div`
    border: 1px solid #68ddf0;;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`
const Instruction = styled.p`
    color: #68ddf0;
    font-size: 20px;
    z-index: 1;
`
const Value = styled.p<{error: string}>`
    //color: #68ddf0;
    font-size: 40px;
    z-index: 10;
    font-weight: bold;
    color: ${(props) => props.error === 'false' ? '#68ddf0' :`#dc0040`}
`
const ValueIncorrect = styled.p`
    color: #dc0040;
    font-size: 20px;
    z-index: 100;
`
export const S = {Container, Screen, Settings, Buttons,Button, Info, Instruction, Value, ValueIncorrect}