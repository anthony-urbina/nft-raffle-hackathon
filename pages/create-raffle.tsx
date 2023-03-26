import { memo } from 'react'
import { CreateRaffle } from '../components/pages'
import { Alchemy, Network } from "alchemy-sdk";


export interface NftData {
    title: string,
    tokenId: string,
    image: string,
    collectionAddress: string
}

export interface CreateRaffleContainerProps {
    nfts: NftData[]
    handleConnectWallet: (address: string) => void
}

const CreateRaffleContainer = ({ nfts, handleConnectWallet}: CreateRaffleContainerProps) => {
    return (
        <CreateRaffle nfts={nfts} />
    )
}
console.log(process.env.ALCHEMY_GOERLI_API_KEY)
export async function getServerSideProps(){
    const config = {
        apiKey: process.env.ALCHEMY_GOERLI_API_KEY,
        network: Network.ETH_MAINNET
    };
    const alchemy = new Alchemy(config);

    const address = "0x07c233C36ac7103bDDD8fdebE9935fE871BF5474";

    const nftsRes = await alchemy.nft.getNftsForOwner(address);
    const nfts: NftData[] = nftsRes.ownedNfts.map(nft => {
        const { title, tokenId, media, contract } = nft
        const image = media[0].gateway
        const collectionAddress = contract.address
        const nftData = {
            title,
            tokenId,
            image,
            collectionAddress
        }
        return nftData;
    })

    return {
        props: { nfts }
    }
}


CreateRaffleContainer.displayName = 'Create Raffle Container'

export default memo(CreateRaffleContainer)
