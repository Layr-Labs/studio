export const STAGE1_TEST_PROMPT1 = `
Give me feedback on my AVS idea. My idea is to build a decentralized ETH token price oracle using multiple price feeds (Coinmarketcap, Coingecko, DEX data, etc.).
`;

export const STAGE2_TEST_PROMPT1 = `
Help me generate a design tech spec for a decentralized ETH token price oracle using multiple price feeds (Coinmarketcap, Coingecko, DEX data, etc.).
`;

export const STAGE3_TEST_PROMPT1 = `
Help me generate a prototype for an ETH token price oracle AVS using Coinmarketcap.
`;


export const STAGE3_TEST_PROMPT2 = `
Help me generate code based on the following task list.
# Required Changes for ETH token price oracle AVS
* Modify the ServiceManager contract to add a new task type for ETH token price oracle
* Create new functionality in HelloWorldServiceManager to handle ETH token price oracle tasks
* Add storage for ETH token price oracle results and metadata
* Implement the operator code to connect with an Coinmarketcap API for ETH token price oracle
* Modify the respondToTask function to handle ETH token price oracle task responses
* Update the README.md to explain the ETH token price oracle AVS

`;





// Work in progress. Requires further testing. Did not generate JSON as expected.
export const STAGE4_TEST_PROMPT = `
Help me generate code based on the following task list for a Decentralized ETH Token Price Oracle AVS using the hello-world-avs codebase:
* Create a new OracleServiceManager contract extending from HelloWorldServiceManager to handle oracle-specific tasks
* Implement an OracleTask struct to store price feed requests with required input parameters and metadata
* Add price feed integration parameters and configurations to the service manager for external data sources
* Modify the createNewTask function to accept price oracle queries with token addresses
* Implement a new respondToTask function to handle operator price report submissions
* Create operator aggregation logic to determine the median/mean price from multiple operator responses
* Add validation logic to check price deviation thresholds between operator responses
* Update or extend StakeRegistry configuration to set appropriate stake requirements for oracle operators
* Create a new PriceFeedTaskProcessor in the operator code to handle fetching prices from external sources
* Implement API clients in the operator code to connect to various price sources (Coinmarketcap, Coingecko, etc.)
* Create a DEX price collector to fetch on-chain price data from decentralized exchanges
* Implement an aggregation strategy in the operator to combine multiple price sources
* Add price confidence scoring based on source freshness and reliability
* Create a new createPriceTask.ts file for users to request price data
* Modify the README.md to include details about the oracle service, setup instructions, and API reference
* Create a monitoring component to track oracle response times and price deviations
* Implement an optional historical price storage mechanism for time-series analysis
`;