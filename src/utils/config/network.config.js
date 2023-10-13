const networkList = {

    eth : {
        mainnet : {
            name: 'MAINNET',
            chainId: '0x1',
            symbol: 'ETH',
            rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
            blockExplorerUrls: ['https://etherscan.io'],
        },
        arbitrum : {
            name: 'Arbitrum One',
            chainId: '0xa4b1',
            symbol: 'ETH',
            rpcUrl: 'https://arb1.arbitrum.io/rpc',
            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io'],
        }
    },
    avalanche: {
        testnet: {
            name: 'Avalanche Testnet',
            chainId: '0xa869',
            symbol: 'AVAX',
            rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
            rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://testnet.snowtrace.io'],
        },
        mainnet: {
            name: 'Avalanche Mainnet',
            chainId: '0xa86a',
            symbol: 'AVAX',
            rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io'],
        },
    },

    bsc: {
        testnet: {
            name: 'BSC Testnet',
            chainId: '0x61',
            symbol: 'BNB',
            rpcUrl: 'https://data-seed-prebsc-1-s3.binance.org:8545',
            rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
            blockExplorerUrls: [' https://testnet.bscscan.com/'],
        },
        mainnet: {
            name: 'BSC Mainnet',
            chainId: '0x38',
            symbol: 'BNB',
            rpcUrl: 'https://bsc-dataseed.binance.org/',
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com'],
        },
    },

    fantom: {
        testnet: {
            name: 'Fantom Testnet',
            chainId: '0xfa2',
            symbol: 'FTM',
            rpcUrl: 'https://rpc.testnet.fantom.network/',
            rpcUrls: ['https://rpc.testnet.fantom.network/'],
            blockExplorerUrls: ['https://testnet.ftmscan.com'],
        },
        mainnet: {
            name: 'Fantom Mainnet',
            chainId: '0xfa',
            symbol: 'FTM',
            rpcUrl: 'https://rpc.ftm.tools/',
            rpcUrls: ['https://rpc.ftm.tools/'],
            blockExplorerUrls: ['https://ftmscan.com'],
        },
    },

    ropsten: {
        testnet: {
            name: 'Ropsten Test Network',
            chainId: '0x3',
            symbol: 'RopstenETH',
            rpcUrl: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
            blockExplorerUrls: ['https://ropsten.etherscan.io/'],
        }
    },

    goerli: {
        testnet: {
            name: 'Goerli',
            chainId: '0x5',
            symbol: 'GoerliETH',
            rpcUrl: 'https://rpc.ankr.com/eth_goerli',
            rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161	'],
            blockExplorerUrls: ['https://goerli.etherscan.io/'],
        }
    }
};

export const fetchNetworkData = (
    { blockchain, network } = { blockchain: 'bsc', network: 'mainnet' }
) => networkList[`${blockchain}`][`${network}`];
