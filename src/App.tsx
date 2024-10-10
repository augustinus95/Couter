import React, {ChangeEvent, useState} from 'react';
import s from './App.module.css'
import {RootState, store} from "./redux/store";
import {S} from './styles/styles'
import {incrementAC, setMaxAC, setMinAC, setValueAC, StateType} from "./redux/counterReducer";
import {useSelector} from "react-redux";

//ts
//rexText
//strangeInput
function App() {

    const state = useSelector<RootState, StateType>((state ) => state.counter)
    const currentValue = state.currentValue
    const minValue = state.minValue
    const maxValue = state.maxValue

    const [last, setLast] = useState(false);
    const [settingMode, setSettingMode] = useState(false);

    function incHandler() {
        {
            maxValue === currentValue ? setLast(true) : store.dispatch(incrementAC())
        }
    }

    function resetHandler() {
        store.dispatch(setValueAC(minValue))
        setLast(false)
        setSettingMode(false)
    }

    function onChangeMinValue(e: ChangeEvent<HTMLInputElement>) {
        setSettingMode(true)
        store.dispatch(setMinAC(+e.currentTarget.value))
    }

    function onChangeMaxValue(e: ChangeEvent<HTMLInputElement>) {
        setSettingMode(true)
        store.dispatch(setMaxAC(+e.currentTarget.value))
    }

    function onSet() {
        setSettingMode(false)
        setLast(false)
        store.dispatch(setValueAC(minValue))
        localStorage.setItem('startValue', JSON.stringify(minValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }

    return (
        <S.Container>
            <S.Screen>
                <S.Settings>
                    <span>max value:</span><input type={"number"} value={maxValue} onChange={onChangeMaxValue}
                                                  className={(!(minValue >= 0 && minValue < maxValue) || maxValue < minValue ? s.incorrect : '')}/>
                    <span>start value:</span><input type={"number"} value={minValue} onChange={onChangeMinValue}
                                                    className={(!(minValue >= 0 && minValue < maxValue) || maxValue < minValue ? s.incorrect : '')}/>
                </S.Settings>
                <S.Buttons>
                    <S.Button onClick={onSet} disabled={minValue > maxValue || minValue < 0}>set</S.Button>
                </S.Buttons>
            </S.Screen>

            <S.Screen>
                <S.Info>
                    {!settingMode ?
                        <S.Value error={currentValue === maxValue ? 'true' : 'false'}>{state.currentValue}</S.Value>
                    : ((minValue > maxValue || minValue < 0) ?
                            <S.ValueIncorrect>Value is incorrect!</S.ValueIncorrect>
                        :<S.Instruction>Enter values and press "SET"</S.Instruction>)
                    }
                </S.Info>
                <S.Buttons>
                    <S.Button onClick={incHandler} disabled={last}>inc</S.Button>
                    <S.Button onClick={resetHandler}>reset</S.Button>
                </S.Buttons>
            </S.Screen>
        </S.Container>
    )
}

export default App;

// {incorrect ?
//     <S.ValueIncorrect>Value is incorrect!</S.ValueIncorrect>
//     : (settingMode ?
//         <S.Instruction>Enter values and press "SET"</S.Instruction>
//         : <S.Value className={(last ? s.redText : '')}>{state.currentValue}</S.Value>)
// }