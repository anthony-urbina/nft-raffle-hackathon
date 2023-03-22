import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,

} from '@chakra-ui/react'
import { RaffleCardProps } from '../raffleCard'

interface Details extends RaffleCardProps {
    yourTickets?: number
    youSpent?: number
    raffler?: `Ox${string}`
    winner?: `Ox${string}` | null
    totalRecieved?: number | null
}
// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export const Details = ({
    edition,
    collection,
    image,
    altText,
    raffleEndTime,
    ticketsSold,
    totalTickets,
    pricePerTicket,
    currency,
    yourTickets,
    youSpent,
    raffler,
    winner,
    totalRecieved
}: Details) => {

    const displayOptionalFields = () => {
        return (
            <>
                { totalRecieved && <Text fontSize={'lg'} fontWeight={'medium'}>{`Total Recieved ${totalRecieved}`}</Text>}
                {yourTickets && <Text fontSize={'lg'} fontWeight={'medium'}>{`Your Tickets ${yourTickets}`}</Text>}
                {youSpent && <Text fontSize={'lg'} fontWeight={'medium'}>{`You Spent ${youSpent}`}</Text>}
                { raffler && <Text fontSize={'lg'} fontWeight={'medium'}>{`Raffler ${raffler}`}</Text> }
                { winner && <Text fontSize={'lg'} fontWeight={'medium'}>{`Winner ${winner}`}</Text> }
            </>
        )

    }

    return (
        <Box border={'1px solid'} rounded={10} p={3}>
            <Text fontSize={'lg'} fontWeight={'medium'}>{edition}</Text>
            <Text fontSize={'lg'} fontWeight={'medium'}>{`Collection: ${collection}`}</Text>
            <Text fontSize={'lg'} fontWeight={'medium'}>{`Tickets Sold: ${ticketsSold}/${totalTickets}`}</Text>
            <Text fontSize={'lg'} fontWeight={'medium'}>{`Collection: ${pricePerTicket} ${currency}`}</Text>
            <Text fontSize={'lg'} fontWeight={'medium'}>{`Ends in: ${raffleEndTime}`}</Text>
            {displayOptionalFields()}
        </Box>
    )
}
