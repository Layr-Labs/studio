export const STAGE1_TEST_PROMPT1 = `
Give me feedback on my AVS idea. My idea is to build a decentralized ETH token price oracle using multiple price feeds (Coinmarketcap, Coingecko, DEX data, etc.).
`;

export const STAGE2_TEST_PROMPT1 = `
Help me generate a design tech spec for an EigenLayer AVS that is a decentralized ETH token price oracle using multiple price feeds (Coinmarketcap, Coingecko, DEX data, etc.).
`;

export const STAGE3_TEST_PROMPT1 = `
Help me generate a task list to build an EigenLayer AVS. My idea is to build a decentralized ETH token price oracle using multiple price feeds (Coinmarketcap, Coingecko, DEX data, etc.).
`;


export const STAGE3_TEST_PROMPT2 = `
Help me generate code based on the following task list.
- Modify the operator code to include methods for fetching and updating the token price data based on the task responses. Integrate APIs or data fetching mechanisms for Coinmarketcap, Coingecko, and DEXs within the new price oracle service. Implement a method to aggregate price data from the different sources to ensure accuracy and reduce the influence of outliers.
- Modify the HelloWorldServiceManager.sol contract to create a decentralized price oracle service with functions to fetch and store multiple pricing data from various sources.
- Define tasks in the IHelloWorldServiceManager.sol interface to allow for price feed requests and updates.
- Set up events in HelloWorldServiceManager.sol to emit price updates and aggregated data for monitoring and transparency.
- Update the ServiceManager contract to allow Operators to sign off on the price updates based on their respective price feeds.
- Update the README.md file to include the overview of the price oracle service and examples of usage with the new methods.
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