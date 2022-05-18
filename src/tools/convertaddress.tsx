import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import {
    Box,
    Center,
    GridItem,
    Heading,
    SimpleGrid,
    VStack,
} from '@chakra-ui/layout';
import { Divider } from '@chakra-ui/react';
import { ethToEchelon, echelonToEth } from 'echelon-address-converter';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { fireError, fireSuccess } from '../landing/alert';
import { signTransaction, callSendAphoton, broadcast } from '../utils/backend';

const ConvertAddress = () => {
    const [result, setResult] = useState('');
    return (
        <VStack
            p={10}
            alignItems="flex-start"
            border="1px"
            h="full"
            borderRadius={25}
        >
            <Heading size="md">Address Converter</Heading>
            <Divider />
            <SimpleGrid columns={[1, 2]} columnGap={3} rowGap={6} w="full">
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="destSendControl">
                        <FormLabel id="destSend">Address</FormLabel>
                        <Input
                            placeholder="0x.. or enron1..."
                            type="text"
                            onChange={(e) => {
                                if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('0x').length == 2
                                ) {
                                    setResult(ethToEchelon(e.target.value));
                                } else if (
                                    e.target.value
                                        .toLocaleLowerCase()
                                        .split('enron1').length == 2
                                ) {
                                    setResult(echelonToEth(e.target.value));
                                } else {
                                    setResult('');
                                }
                            }}
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={[1, 2]}>
                    <FormControl id="amountSendControl">
                        <FormLabel id="amountSend">Result</FormLabel>
                        <Input value={result} type="text"></Input>
                    </FormControl>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default ConvertAddress;
