import React, { createContext, useReducer } from 'react';
import internal from 'stream';
import { ethToEchelon } from 'echelon-address-converter';

interface Action {
    type: string;
    payload: any;
}

export interface Balance {
    denom: string;
    amount: string;
}
export interface BalanceCosmos {
    balances: Balance[];
    pagination: {
        total: string;
        nextKey: string;
    };
    rewards: string;
}

export interface BalanceERC20Item {
    name: string;
    symbol: string;
    decimals: string;
    balance: string;
    address: string;
}
export interface GlobalState {
    state: {
        walletEnron: string;
        walletEth: string;
        pubkey: string;
        provider: string;
        balanceCosmos: Balance[];
        balanceERC20: BalanceERC20Item[];
        aphoton: string;
        rewards: number;
    };
    dispatch: React.Dispatch<Action>;
}

const initialState: any = {
    walletEnron: 'enron1...',
    walletEth: '0x...',
    pubkey: 'At/+...',
    provider: '',
    balanceCosmos: [],
    balanceERC20: [],
    aphoton: '0',
    rewards: 0,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer((state: any, action: Action) => {
        switch (action.type) {
            case 'wallet':
                return {
                    ...state,
                    walletEth: action.payload.walletEth,
                    walletEnron: ethToEchelon(action.payload.walletEth),
                };
            case 'pubkey':
                return { ...state, pubkey: action.payload.pubkey };
            case 'provider':
                return { ...state, provider: action.payload.provider };
            case 'rewards':
                return { ...state, 
                    rewards: action.payload.rewards 
                };
            case 'cleanup':
                return initialState;
            case 'update':
                const newState = action.payload;
                return newState;
            case 'cosmosCoins':
                let temp = action.payload.balances.filter((e: Balance) => {
                    if (e.denom == 'aenron') {
                        return true;
                    }
                });
                return {
                    ...state,
                    balanceCosmos: action.payload.balances,
                    aphoton: temp.length == 1 ? temp[0].amount : 0,
                };
            case 'erc20Coins':
                return {
                    ...state,
                    balanceERC20: action.payload,
                };
            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
