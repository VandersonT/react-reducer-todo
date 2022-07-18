/*---------------------IMPORTS---------------------*/
import { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
/*-------------------------------------------------*/


/*----------------------TYPES----------------------*/
type Item = {
    id: string;
    txt: string;
    done: boolean;
}

type ActionType = {
    type: string;
    payload?: {
        id?: string;
        txt?: string;
        done?: boolean;
    }
}
/*-------------------------------------------------*/



const defaultValue: Item[] = [];

const reducer = (list: Item[], action: ActionType) => {
    let clone = [...list];/*clone variable to avoid refresh error*/

    switch(action.type){
        case 'ADD':
            if(action.payload?.txt) clone.push({id: uuidv4(),txt: action.payload?.txt,done: false});
            break;
        case 'DELETE':
            clone = clone.filter(item => item.id !== action.payload?.id);
            break;
        case 'CHANGE':
            for(let i = 0; i < clone.length; i++)
                if(clone[i].id == action.payload?.id) clone[i].done = action.payload?.done!;
            break;
    }

    return clone;
}

export const useTodoList = () => {return useReducer(reducer, defaultValue);}