import { Box, Heading, Text, VStack } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import { getPubKey, getWalletEth, getWalletEnron } from '../utils/db';
import { connectMetamask } from '../utils/metamask';
import { store } from '../utils/state';
import { reconnectWallet } from '../utils/wallet';
import AddressDetails from './addressDetails';
import WalletButtons from './walletButtons';

const EnronHeader = () => {
    const globalState = useContext(store);

    useEffect(() => {
        reconnectWallet(globalState);
    }, []);

    return (
        <Box py={12} w="full" boxShadow="lg" bgColor="purple.600">
            <VStack spacing={3} alignItems="center">
                <Heading size="3xl" color="white">
                    Enron
                </Heading>
                <Text color="white">Your all in one enron wallet</Text>
                <WalletButtons />
            </VStack>
            <AddressDetails
                wallet={globalState.state.walletEth}
                walletEnron={globalState.state.walletEnron}
                publicKey={globalState.state.pubkey}
            />
        </Box>
    );
};
export default EnronHeader;
