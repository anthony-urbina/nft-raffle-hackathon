import { memo } from 'react'
// import { ErrorBoundary, Meta } from '../components/elements'
import { RaffleDetails } from '../components/pages'
// import {
//     ERROR_FALLBACK,
//     BUBBLE_BOAT_MIAMI_TITLE,
//     BASE_URL,
//     BUBBLE_BOAT_MIAMI,
//     BUBBLE_BOAT_MIAMI_IMAGE,
// } from '../constants'

const RaffleDetailsContainer = () => {
    return (
        < RaffleDetails />
    )
}

RaffleDetailsContainer.displayName = 'Create Raffle Container'

export default memo(RaffleDetailsContainer)
