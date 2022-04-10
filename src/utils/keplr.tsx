import { echelonToEth } from 'ethermint-address-converter';
import { fireError, fireSuccess } from '../landing/alert';
import { setKeplr, setPubKey, setWalletEth, setWalletEchelon } from './db';
import { reconnectWallet } from './wallet';

const config = {
    // RPC_URL: 'https://echelon-archive-testnet.api.bdnodes.net:26657',
    // REST_URL: 'https://echelon-archive-testnet.api.bdnodes.net:1317',
    RPC_URL: '89.233.104.101:26656',
    REST_URL: 'https://api.ech.network',

    EXPLORER_URL: 'https://explorer.ech.network/',
    NETWORK_NAME: 'Echelon',
    NETWORK_TYPE: 'mainnet',
    CHAIN_ID: 'echelon_3000-3',
    CHAIN_NAME: 'Echelon Mainnet',
    COIN_DENOM: 'ECH',
    COIN_MINIMAL_DENOM: 'aechelon',
    COIN_DECIMALS: 18,
    PREFIX: 'echelon',
    COIN_TYPE: 60,
    GAS_PRICE_STEP_LOW: 0.05,
    GAS_PRICE_STEP_AVERAGE: 0.25,
    GAS_PRICE_STEP_HIGH: 0.4,
};

const REST_URL = config.REST_URL;
const RPC_URL = config.RPC_URL;

const chainId = config.CHAIN_ID;
const chainName = config.CHAIN_NAME;
const coinDenom = config.COIN_DENOM;
const coinMinimalDenom = config.COIN_MINIMAL_DENOM;
const coinDecimals = config.COIN_DECIMALS;
const prefix = config.PREFIX;

const chainConfig = {
    chainId: chainId,
    chainName,
    rpc: RPC_URL,
    rest: REST_URL,
    stakeCurrency: {
        coinDenom,
        coinMinimalDenom,
        coinDecimals,
    },
    bip44: {
        coinType: 60,
    },
    bech32Config: {
        bech32PrefixAccAddr: `${prefix}`,
        bech32PrefixAccPub: `${prefix}pub`,
        bech32PrefixValAddr: `${prefix}valoper`,
        bech32PrefixValPub: `${prefix}valoperpub`,
        bech32PrefixConsAddr: `${prefix}valcons`,
        bech32PrefixConsPub: `${prefix}valconspub`,
    },
    currencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
        },
    ],
    feeCurrencies: [
        {
            coinDenom,
            coinMinimalDenom,
            coinDecimals,
        },
    ],
    gasPriceStep: {
        low: config.GAS_PRICE_STEP_LOW,
        average: config.GAS_PRICE_STEP_AVERAGE,
        high: config.GAS_PRICE_STEP_HIGH,
    },
    coinType: 60,
};

declare global {
    interface Window {
        getOfflineSignerOnlyAmino: any;
        keplr: any;
        getOfflineSigner: any;
    }
}

export async function connectKeplr(state: any) {
    if (!window.getOfflineSignerOnlyAmino || !window.keplr) {
        fireError('Error with Keplr', 'Please install keplr extension');
        return;
    }
    //  else {
    //     if (window.keplr.experimentalSuggestChain) {
    //         try {
    //             await window.keplr.experimentalSuggestChain(chainConfig);
    //         } catch (error) {
    //             fireError('Error with Keplr', 'Failed to suggest the chain');
    //         }
    //     } else {
    //         fireError(
    //             'Error with Keplr',
    //             'Please use the recent version of keplr extension'
    //         );
    //     }
    // }

    if (window.keplr) {
        await window.keplr.enable('echelon_3000-3');
        const offlineSigner = window.getOfflineSigner('echelon_3000-3');
        fireSuccess(
            'Logged in with Keplr',
            'You can now start using wallet.ech.network!'
        );
        let wallets = await offlineSigner.getAccounts();
        setKeplr();
        setWalletEchelon(wallets[0].address);
        setWalletEth(echelonToEth(wallets[0].address));
        let pubkey = btoa(String.fromCharCode.apply(null, wallets[0].pubkey));
        setPubKey(pubkey);
        await reconnectWallet(state);
    } else {
        return null;
    }
}

export async function signCosmosTransactionKeplr(wallet: string, res: any) {
    await window.keplr.enable(res.chainId);
    const offlineSigner = window.getOfflineSigner(res.chainId);

    let bodyBytes = new Uint8Array(
        atob(res.bodyBytes)
            .split('')
            .map(function (c) {
                return c.charCodeAt(0);
            })
    );
    let authInfoBytes = new Uint8Array(
        atob(res.authInfoBytes)
            .split('')
            .map(function (c) {
                return c.charCodeAt(0);
            })
    );
    let chainId = res.chainId;
    let accountNumber = res.accountNumber;

    let sign = await window.keplr.signDirect(
        chainId,
        wallet,
        {
            bodyBytes,
            authInfoBytes,
            chainId,
            accountNumber,
        },
        { isEthereum: true }
    );

    // TODO: use Buffer to parse this insteaf of btoa
    return {
        signature: sign.signature.signature,
        authBytes: btoa(
            String.fromCharCode.apply(null, sign.signed.authInfoBytes)
        ),
        bodyBytes: btoa(String.fromCharCode.apply(null, sign.signed.bodyBytes)),
    };
}