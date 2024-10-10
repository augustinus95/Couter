import {counterReducer} from "./counterReducer";
import {combineReducers, legacy_createStore} from 'redux'

const rootReducer = combineReducers({
    counter: counterReducer,

})
export const store = legacy_createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>
// @ts-ignore
window.store = store