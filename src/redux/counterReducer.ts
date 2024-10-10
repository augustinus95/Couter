
type ActionType = {
    type: 'INCREMENT' | 'DECREMENT' | 'SET-VALUE' | 'SET-MIN' | 'SET-MAX'
     value?: number
}
export type StateType = {
    minValue: number
    maxValue: number
    currentValue: number
}
const loadLocalStorege = (value:string) => {
    try {
        const serializedState = localStorage.getItem(value);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

 const initialState : StateType = {
    minValue: loadLocalStorege("minValue"),
    maxValue: loadLocalStorege("maxValue"),
    currentValue: loadLocalStorege("currentValue"),
}

export function counterReducer(state: StateType = initialState, action: ActionType): StateType {
    switch (action.type) {
        case 'INCREMENT':
            localStorage.setItem('currentValue', JSON.stringify(state.currentValue + 1 ));
            return {...state, currentValue: state.currentValue + 1  }
        case 'SET-VALUE':
            if (action.value === undefined) return state
            const serializedCurrentValue = JSON.stringify(action.value);
            localStorage.setItem('currentValue', serializedCurrentValue);
            return {...state, currentValue: action.value}
        case 'SET-MIN':
            if (action.value === undefined) return state
            const serializedMinValue = JSON.stringify(action.value);
            localStorage.setItem('minValue', serializedMinValue);
            return {...state, minValue: action.value}
        case 'SET-MAX':
            if (action.value === undefined) return state
            const serializedMaxValue = JSON.stringify(action.value);
            localStorage.setItem('maxValue', serializedMaxValue);
            return {...state, maxValue: action.value}
        default:
            return state
    }
}

export function incrementAC (): ActionType {
    return {
        type: 'INCREMENT'
    }
}
export function setValueAC (value: number): ActionType {
    return {
        type: 'SET-VALUE',
        value: value
    }
}
export function setMinAC (value: number): ActionType {
    return {
        type: 'SET-MIN',
        value: value
    }
}
 export function setMaxAC (value: number): ActionType {
     return {
         type: 'SET-MAX',
         value: value
     }
 }