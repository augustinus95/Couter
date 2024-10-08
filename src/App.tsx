import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.css'
import styled from "styled-components";

function App() {
    const [value, setValue] = useState(0);
    const [startValue, setStartValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1);
    const [last, setLast] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [settingMode, setSettingMode] = useState(true);

    useEffect(() => {
        let valueAsString = localStorage.getItem('counterValue');
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            setValue(newValue)
        }
        let startValueAsString = localStorage.getItem('startValue');
        if (startValueAsString) {
            let newValue = JSON.parse(startValueAsString)
            setStartValue(newValue)
        }
        let maxValueAsString = localStorage.getItem('maxValue');
        if (maxValueAsString) {
            let newValue = JSON.parse(maxValueAsString)
            setMaxValue(newValue)
        }
    }, []);
    useEffect(() => {
        if (value === maxValue) {
            setLast(true)
        }
        localStorage.setItem('counterValue', JSON.stringify(value))
    }, [value])
    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
    }, [startValue])
    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])

    function incHandler() {
        setValue(value + 1)
    }

    function onReset() {
        setValue(startValue);
        setLast(false)
        setSettingMode(false)
    }

    function onChangeStartValue(e: ChangeEvent<HTMLInputElement>) {
        setSettingMode(true)
        const startValue = +e.currentTarget.value;
        if (startValue >= 0  && startValue < maxValue) {
            setIncorrect(false)
            setStartValue(startValue)
        } else {
            setIncorrect(true)
            setStartValue(startValue)
        }
    }

    function onChangeMaxValue(e: ChangeEvent<HTMLInputElement>) {
        setSettingMode(true)
        const maxValue = +e.currentTarget.value
        if (maxValue <= startValue) {
            setIncorrect(true)
            setMaxValue(maxValue)
        } else {
            setIncorrect(false)
            setMaxValue(maxValue)
        }
    }

    function onSet() {
        setSettingMode(false)
        setLast(false)
        setValue(startValue)

        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }

    return (
        <Container>
            <Screen>
                <Settings>
                    <span>max value:</span><input type={"number"} value={maxValue} onChange={onChangeMaxValue}
                                                  className={(incorrect ? s.incorrect : '')}/>
                    <span>start value:</span><input type={"number"} value={startValue} onChange={onChangeStartValue}
                                                    className={(incorrect ? s.incorrect : '')}/>
                </Settings>
                <Buttons>
                    <Button onClick={onSet} disabled={incorrect}>set</Button>
                </Buttons>
            </Screen>

            <Screen>
                <Info>
                    {incorrect ?
                        <ValueIncorrect>Value is incorrect!</ValueIncorrect>
                        : (settingMode ?
                            <Instruction>Enter values and press "SET"</Instruction>
                            : <Value className={last ? s.last : ""}>{value}</Value>)
                    }
                </Info>
                <Buttons>
                    <Button onClick={incHandler} disabled={last}>inc</Button>
                    <Button onClick={onReset}>reset</Button>
                </Buttons>
            </Screen>
        </Container>
    )
}

export default App;

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
const Value = styled.p`
    color: #68ddf0;
    font-size: 40px;
    z-index: 10;
    font-weight: bold;
`
const ValueIncorrect = styled.p`
    color: #dc0040;
    font-size: 20px;
    z-index: 100;
`
//#dc0040