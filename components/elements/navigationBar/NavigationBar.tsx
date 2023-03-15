import {
    Box,
    Flex,
    Link,
    Button,
    Image,
    HStack,
    LinkBox,
    LinkOverlay,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
// import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';

const alchemyId = 'EoOTjHvOIujYqlStV6ppG71Y7Cf94wRj';

const client = createClient(
    getDefaultClient({
        appName: "ROFL",
        alchemyId,
    }),
);

export const NavigationBar = () => {
    const router = useRouter()

    return (
        <Flex justify="space-between" align="center" borderBottom="1px">
            <Link as={NextLink} href='' _activeLink={{ textDecor: 'none' }} _hover={{ textDecor: 'none' }}>
                <Flex alignItems="center" paddingX={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                    <Box>
                        <Image boxSize='3rem' src='/static/rofl-logo.png' alt='rofl-logo.png' />
                    </Box>
                    <Box>
                        <Text fontFamily='Syne Tactile' fontSize='1.25rem' color='#C95CC9' ml='.5rem'>ROFL</Text>
                    </Box>
                </Flex>
            </Link>
            <Flex>
                <Button bgColor='white' aria-label='create raffle' p='1.25rem' m='.5rem' boxSize={5} leftIcon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);">
                    Create Raffle
                </Button>
                <Box paddingRight={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                    <WagmiConfig client={client}>
                        <ConnectKitProvider theme='rounded'>
                            <ConnectKitButton />
                        </ConnectKitProvider>
                    </WagmiConfig>
                </Box>
            </Flex>
        </Flex>
    )

}
                {/* <IconButton bgColor='white' aria-label='create raffle' p='1.25rem' m='.5rem' boxSize={5} icon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);" /> */}
