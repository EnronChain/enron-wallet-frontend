import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Center, SimpleGrid } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { useContext } from 'react';
import { FaReact } from 'react-icons/fa';
import TextSpan from '../theme/textSpan';
import { store, Balance } from '../utils/state';
import General, { GeneralCards } from './general';
import { GlobalState } from '../utils/state';
import Strong from '../template/strong';
import TitleH2 from '../template/heading2';

function CosmosSubtitle() {
    return (
        <TitleH2
            content={
                <>
                    <Strong content={'Enron Coins'} />
                    {' balances.'}
                    <br />
                    {'('}
                    <Strong content={'Aenron'} />
                    {', '}
                    <Strong content={'IBC'} />
                    {', '}
                    <Strong content={"enron' ERC20 coins"} />
                    {')'}
                </>
            }
        />
    );
}

function CosmosIconFooter() {
    return (
        <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'purple.200'}>
            <FaReact fill={'currentColor'} size="40px" />
        </Icon>
    );
}

function CosmosGrid({ globalState }: { globalState: GlobalState }) {
    return (
        <SimpleGrid
            columns={{
                base: 1,
                xl: globalState.state.balanceCosmos.length > 2 ? 2 : 1,
            }}
            spacing={'20'}
            mt={16}
            mx={'auto'}
        >
            {globalState.state.balanceCosmos.length > 0 ? (
                globalState.state.balanceCosmos.map(
                    (coin: Balance, index: number) => {
                        return (
                            <GeneralCards
                                key={index}
                                name={coin.denom}
                                role={`Current ${coin.denom} balance.`}
                                content={[
                                    <TextSpan
                                        content={`${coin.amount} ${coin.denom}`}
                                        key={`${coin.denom}key`}
                                    />,
                                ]}
                                avatar={
                                    coin.denom == 'aenron'
                                        ? useColorModeValue(
                                              './enron.png',
                                              './enron.png'
                                          )
                                        : useColorModeValue(
                                              './coins.png',
                                              './coins-white.png'
                                          )
                                }
                            />
                        );
                    }
                )
            ) : (
                <GeneralCards
                    key="no_balance"
                    name="No balance"
                    role={'There is no balance for this wallet.'}
                    content={[
                        <Center key="nobalancetext" textAlign="center">
                            This wallet does not have any coins! Send coins or login with
                            another wallet!
                        </Center>,
                    ]}
                />
            )}
        </SimpleGrid>
    );
}

export const CosmosSection = () => {
    const globalState = useContext(store);
    return (
        <General
            title="Your Enron Coins"
            subtitle={[<CosmosSubtitle key="sub" />]}
            content={[<CosmosGrid key="grid" globalState={globalState} />]}
            icon={[<CosmosIconFooter key="footer" />]}
        ></General>
    );
};
