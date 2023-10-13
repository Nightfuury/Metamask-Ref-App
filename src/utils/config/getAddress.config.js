import { fetchTokenAddressData } from '../config/address/address.token';
import { fetchTierStakingAddressData } from './address/address.tier.staking';
import { fetchIdoAddress } from './ido/ido.address';
import { fetchClaimAddress } from './claim/claim.address';
import { fetchStakingAbi } from './stakingAbi/getStaking.abi';
import {aptosIdoAbi} from '../abi/Ido/aptos.ido.abi';
import { claimAbi} from '../abi/claim/claim.abi';

export const fetchAddressConfig = (
    { name, type, blockchain, network } = {
        type: 'TOKEN',
        blockchain: 'bsc',
        network: 'mainnet',
    }
) => {
    if (type === 'TOKEN') {
        return {
            address: fetchTokenAddressData({ tokenName: name, blockchain: blockchain, network: network }),
        };
    }


    if (type === 'TIERSTAKING') {
        return {
            abi: fetchStakingAbi({ name: name }),
            address: fetchTierStakingAddressData({ name: name, blockchain: blockchain, network: network }),
        };
    }

    if (type === 'IDO') {
        return {
            abi: aptosIdoAbi,
            address: fetchIdoAddress({ idoName: name, blockchain: blockchain, network: network }),
        };
    }

    if (type === 'CLAIM') {
        return {
            abi: claimAbi,
            address: fetchClaimAddress({ claimName: name, blockchain: blockchain, network: network }),
        };
    }
};