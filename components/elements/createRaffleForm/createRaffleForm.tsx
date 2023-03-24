import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    UnorderedList,
    SimpleGrid
} from '@chakra-ui/react'
import { ERC20ABI } from '../../../constants/abi'
import { AddIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { useFormik } from "formik";
import * as yup from "yup"
import { ReactNode, useState } from 'react'
import { SelectNftCard } from '../selectNftCard';
import { CreateRaffleProps } from '../../pages';
import { NftData } from '../../../pages/create-raffle';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/EoOTjHvOIujYqlStV6ppG71Y7Cf94wRj"');

const contractAddress = '0x07bBd40586B0287C8109F297afD1f0DB8E3013a2'
const abi = ERC20ABI

const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, abi, signer)


interface NftDataContractReady extends Omit<NftData, 'image'> { }
interface CreatedRaffle {
    reservePrice: string
    ticketPrice: string
    endDate: string
    nft: NftDataContractReady
}

export const CreateRaffleForm = ({ nfts }: CreateRaffleProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNftData, setSelectedNftData] = useState<NftDataContractReady | null>(null);

    const [collectionAddress, setCollectionAddress] = useState('')
    const [tokenId, setTokenId] = useState('')
    const [reservePrice, setReservePrice] = useState('')
    const [ticketPrice, setTicketPrice] = useState('')

    // ethers.utils.parseEther('0.01')
    const numTickets = 100;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentDate = new Date().toLocaleString('en-US', { timeZone: userTimeZone });

    let count = -1;
    const createSelectNftCardLi = () => {
        const nftCardComponents: ReactNode[] = nfts.map(nft => {
            const { title, tokenId, image } = nft
            count++
            return (
                <SelectNftCard key={count} title={title} image={image} handleSelectedNft={handleSelectedNft} count={count} />
            )
        })
        return nftCardComponents
    }

    const formik = useFormik({
        initialValues: {
            reservePrice: '0.01',
            ticketPrice: '0.01',
            endDate: currentDate

        },
        validationSchema: yup.object({
            ticketPrice: yup
                .string()
                .required()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000'),
            reservePrice: yup
                .string()
                .required()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max')
        }),
        onSubmit: async (values) => {
            if (!selectedNftData) {
                console.log('no no no')
                return
            }
            const { reservePrice, ticketPrice, endDate } = values
            const createdRaffle: CreatedRaffle = {
                reservePrice,
                ticketPrice,
                endDate,
                nft: selectedNftData
            }
            const tx = await contract.createRaffle(collectionAddress, tokenId, reservePrice, ticketPrice);
            // const tx = await contract.createRaffle(_nftCollectionAddress, _nftTokenId, _reservePrice, _ticketPrice);

            await tx.wait();

            console.log('createdRaffle', createdRaffle)
        },
    });

    const handleErrMessages = (fieldId: string) => {
        const fieldErrs = fieldId === 'ticketPrice' ? errors.ticketPrice : errors.reservePrice
        return fieldErrs ? <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>{fieldErrs}</FormErrorMessage>
            : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>Choose your price per ticket</FormHelperText>
    }

    const handleSelectedNft = (event: React.MouseEvent<HTMLButtonElement>, selectedNft: number) => {
        const { target } = event
        const { title, tokenId, collectionAddress } = nfts[selectedNft]
        const nftData: NftDataContractReady = {
            title,
            tokenId,
            collectionAddress
        }
        setSelectedNftData(nftData)
        onClose()
    }

    const { getFieldProps, handleSubmit, errors } = formik

    return (
        <>
            <Flex flexDir={['column', null, null, 'row']} ml={[null, null, null, '.5rem']}>
                <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m={['0 auto', null, null, 'initial']} onClick={onOpen}>
                    <Box>
                        <Button background={'transparent'} leftIcon={<AddIcon mb='.5rem' boxSize={9} />} display='flex' flexDir='column'>
                            Select NFT
                        </Button>
                    </Box>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose} size={{ base: "90vw", md: "90vh" }} motionPreset='slideInBottom' scrollBehavior='inside'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign={'center'} fontSize={'3xl'} pb={'.5rem'}>Select NFT</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb='2rem' px={'1.25rem'}>
                            <UnorderedList styleType='none' m='0'>
                                <SimpleGrid spacing='1.25rem' minChildWidth='157px'>
                                    {createSelectNftCardLi()}
                                </SimpleGrid>
                            </UnorderedList>
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <form onSubmit={handleSubmit}>
                    <FormControl w={['353px', null, null, '175px']} m={['0 auto', null, null, 'initial']} ml={[null, null, null, 10]} mt={['.75rem', null, null, '0']}>
                        <Flex p='1rem' justify='space-between' rounded='1rem' border='1px' mb={['.75rem', null, null, '.75rem']} flexDir='column' w={['353px', null, null, '175px']}>
                            <Flex flexDir={['row', null, null, 'column']} justify='space-between'>
                                <Flex direction='column'>
                                    <FormControl>
                                        <FormLabel htmlFor='currency' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Currency</FormLabel>
                                        <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>The token used for buying tickets</FormHelperText>
                                        <Select
                                            id='currency'
                                            name='currency'
                                            placeholder='ETH'
                                            w='150px' h='25px'
                                            textAlign='center'
                                            rounded='1rem'>
                                            <option value="APE">APE</option>
                                        </Select>
                                    </FormControl>
                                </Flex>
                                <Flex direction='column'>
                                    <FormControl isInvalid={!!errors.ticketPrice}>
                                        <FormLabel htmlFor='ticketPrice' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Ticket Price</FormLabel>
                                        {handleErrMessages('ticketPrice')}
                                        <Input
                                            id='ticketPrice'
                                            type='text'
                                            w='150px'
                                            h='25px'
                                            rounded='1rem'
                                            textAlign='center'
                                            {...getFieldProps('ticketPrice')} />
                                    </FormControl>
                                </Flex>
                            </Flex>
                            <Flex flexDir={['row', null, null, 'column']} justify='space-between'>
                                <Flex direction='column'>
                                    <FormControl isInvalid={!!errors.reservePrice}>
                                        <FormLabel htmlFor="reservePrice" marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Reserve Price</FormLabel>
                                        {handleErrMessages('reservePrice')}
                                        <Input
                                            id="reservePrice"
                                            w='150px' h='25px'
                                            rounded='1rem'
                                            textAlign='center'
                                            {...getFieldProps('reservePrice')} />
                                    </FormControl>
                                </Flex>
                                <Flex direction='column'>
                                    <FormControl>
                                        <FormLabel htmlFor='endDate' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Raffle End Date</FormLabel>
                                        <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>Raffle minimum</FormHelperText>
                                        <Input
                                            id="endDate"
                                            w='150px'
                                            h='25px'
                                            rounded='1rem'
                                            size="md"
                                            type="datetime-local"
                                            min={currentDate}
                                            textAlign='center'
                                            {...getFieldProps('endDate')} />
                                    </FormControl>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex justify='center' pb={3}>
                            <Button type='submit' border='1px' rounded='1.5rem' fontFamily='Inter' fontWeight='normal' w='100%'>
                                Create Raffle
                            </Button>
                        </Flex>
                    </FormControl>
                </form>
            </Flex>
        </>
    )
}
