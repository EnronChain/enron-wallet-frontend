export function getProvider() {
    return localStorage.getItem('provider');
}
export function setProvider(provider: string) {
    return localStorage.setItem('provider', provider);
}

export function unsetProvider() {
    return localStorage.removeItem('provider');
}

export function isMetamask() {
    return getProvider() == 'metamask';
}

export function setMetamask() {
    return setProvider('metamask');
}

export function isKeplr() {
    return getProvider() == 'keplr';
}

export function setKeplr() {
    return setProvider('keplr');
}

export function getWalletEth() {
    return localStorage.getItem('walleteth');
}
export function setWalletEth(wallet: string) {
    return localStorage.setItem('walleteth', wallet);
}

export function unsetWalletEth() {
    return localStorage.removeItem('walleteth');
}

export function getWalletEnron() {
    return localStorage.getItem('walletenron');
}
export function setWalletEnron(wallet: string) {
    return localStorage.setItem('walletenron', wallet);
}

export function unsetWalletEnron() {
    return localStorage.removeItem('walletenron');
}

export function getPubKey() {
    return localStorage.getItem('pubkey');
}
export function setPubKey(key: string) {
    return localStorage.setItem('pubkey', key);
}

export function unsetPubKey() {
    return localStorage.removeItem('pubkey');
}
