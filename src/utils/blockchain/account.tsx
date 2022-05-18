import { accountEndpoint } from '@tharsis/provider';
import { REACT_APP_NODE_URL } from '../contants';
import { getPubKey, getWalletEnron } from '../db';

export async function enronPubKey(address: string) {
    const get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    let resp: any;
    try {
        let addr = await fetch(`/accounts/${address}`,
            // `${REACT_APP_NODE_URL}${accountEndpoint}${address}`,
            get
        );
        // If error 400 wallet doesn't exists
        resp = await addr.json();
    } catch (e) {
        console.error(e);
        return null;
    }
    if ('account' in resp) {
        if ('base_account' in resp.account) {
            if ('pub_key' in resp.account.base_account) {
                if (resp.account.base_account.pub_key !== null) {
                    return resp.account.base_account.pub_key.key;
                }
            }
        }
    }

    return '';
}

export async function getAccount() {
    // TODO: abstract this logic as get account
    const userWallet = getWalletEnron();
    if (userWallet == null) {
        return null;
    }
    const pubkey = getPubKey();
    if (pubkey == null) {
        return null;
    }

    const get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let resp;
    try {
        let addr = await fetch(`/accounts/${userWallet}`,
            // `${REACT_APP_NODE_URL}${accountEndpoint}${userWallet}`,
            get
        );
        // If error 400 wallet doesn't exists
        resp = await addr.json();
    } catch (e) {
        console.error(e);
        return null;
    }

    return {
        accountAddress: userWallet,
        sequence: parseInt(resp.account.base_account.sequence),
        accountNumber: parseInt(resp.account.base_account.account_number),
        pubkey: pubkey,
    };
}

export async function getRewards() {
    // TODO: abstract this logic as get account
    const userWallet = getWalletEnron();
    if (userWallet == null) {
        return null;
    }

    const get = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let resp;
    try {
        let addr = await fetch(`/rewards/${userWallet}`,
            // `${REACT_APP_NODE_URL}${accountEndpoint}${userWallet}`,
            get
        );
        // If error 400 wallet doesn't exists
        resp = await addr.json();
        console.log(resp);
    } catch (e) {
        console.error(e);
        return 0;
    }

    // return {
    //     validatorAddress: resp.rewards.validator_address,
    //     if (resp.length > 1) {
    //         rewards: resp.rewards.reward.amount,
    //     }
    // };

    if (Array.isArray(resp.rewards)) {
        if (typeof resp.rewards[0] !== 'undefined') {
            if (typeof resp.rewards[0].reward[0] !== 'undefined') {
                if (typeof resp.rewards[0].reward[0].amount !== 'undefined') {
                    return resp.rewards[0].reward[0].amount;
                }
            }
        } else {
            return 0;
        }
    }
}