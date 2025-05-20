export const eigenBasicsDoc = `

The following is a basic overview of the EigenLayer protocol and Autonomous Verifiable Services (AVSs).

# What is EigenLayer?

Building a new Web3 service comes with significant challenges: bootstrapping crypto-economic security and assembling a reliable network of Operators. Meanwhile, the Web3 ecosystem is rich with opportunities, including a surplus of asset holders eager to earn rewards and skilled Operators seeking to expand into new, value-driven services. EigenLayer bridges this gap, aligning incentives and unlocking untapped potential for both builders and the broader community.

EigenLayer is a protocol built on Ethereum that introduces Restaking, a new primitive for Web3 builders that provides a "marketplace for trust" bringing together Restakers, Operators, and Autonomous Verifiable Services (AVSs). It allows users to stake assets such as Native ETH, Liquid Staking Tokens (LSTs), the EIGEN token, or any ERC20 token into EigenLayer smart contracts, thereby extending Ethereum's cryptoeconomic security to additional applications on the network. It fosters innovation by enabling newer projects to benefit from Ethereum's robust security guarantees without the need to replicate the costly process of securing their own network.

AVSs have tools to make economic commitments to their end users, such as proper or fair execution of their code run by Operators. The Rewards v2 (currently in Testnet) upgrade enables AVSs to issue rewards to Operators and Stakers when the AVS' services are properly run (the carrot). The Slashing and Operator Sets (currently in Testnet) upgrade gives AVSs the ability to slash stake in instances where the commitments to properly run their services are broken (the stick).

## Why Build with EigenLayer?

Ethereum is a secure foundation for decentralized applications and has established itself as the best in class infrastructure for smart contract apps. However, many Web3 builders wish to expand beyond Ethereum's compute capability and offer secured off-chain services for their communities. EigenLayer acts as an additional layer on top of Ethereum, allowing developers to build on this foundation without having to duplicate the cost, complexities, or resources needed to create their own blockchain network and services.

EigenLayer solves the bootstrapping problem for new Web3 services by aggregating a ready-to-deploy network of Operators and Restaked assets that are ready to operate and validate new Web3 services. Instead of requiring every Web3 builder to independently raise capital, establish cryptoeconomic security, and onboard Operators, EigenLayer offers Cryptoeconomic Security as a Service. This approach frees builders to focus on their core differentiators, accelerating innovation without the need to build security frameworks from scratch.

The key benefits of building an AVS on EigenLayer include:

- Security via Restaking: leverage Ethereum's staking mechanism to secure your service.
- Focus on your project's unique value: spend less time and resources accumulating economic security from scratch.
- Bootstrap your Operator network: quickly access a large network of experienced Operators.
- Decentralization and Trust: build on trust minimized, decentralized infrastructure.
- Composability: seamlessly integrate with the broader Ethereum ecosystem.

## EigenLayer Architecture Overview

The core components of the EigenLayer protocol include:

- **Restaking** enables stakers to restake their Native ETH or Liquid Staking Tokens (LST) to provide security for services in the EigenLayer ecosystem, known as Autonomous Verifiable Services (AVSs).
- **Autonomous Verifiable Services (AVSs)** are services built on the EigenLayer protocol that leverage Ethereum's shared security. AVSs deliver services to users and the broader Web3 ecosystem. 
- **Operators** are entities that run AVS software and perform validation tasks for AVSs built on EigenLayer. They register in EigenLayer and allow stakers to delegate to them, then opt in to provide various services (AVSs) built on top of EigenLayer.
- **Delegation** is the process where stakers delegate their restaked ETH or LSTs to Operators or run validation services themselves, effectively becoming an Operator. This process involves a double opt-in between both parties, ensuring mutual agreement. Restakers retain agency over their stake and choose which AVSs they opt-in to validate for.
- EigenLayer **Rewards** enables AVSs to make rewards distributions to stakers and operators that opt-in to support the AVS. AVSs make RewardsSubmissions to the RewardsCoordinator, a core protocol contract.
- **Slashing** is a penalty for improperly or inaccurately completing tasks assigned in Operator Sets by an AVS. A slashing results in a burning/loss of funds.

# Key Terms

- **Autonomous Verifiable Services (AVS):**  a service built externally to EigenLayer that requires active verification by a set of Operators. An AVS deploys its service manager to interact with EigenLayer core contracts that allow for Operator registration to Operator Sets, slashing, and rewards distribution. Once registered, an Operator agrees to run the AVS's off-chain code.

- **Allocation / Deallocation:** an in-protocol commitment of security to an AVS's Operator Set by an Operator. The act of allocating demarcates portions of an Operator's delegated stake as Unique Stake, making it slashable by a single AVS. Deallocation is the same process in reverse, subject to additional time delays that ensure AVSs can appropriately slash for tasks that have occurred in the past.

- **AVS Developer**: development team that builds an AVS service.
- **Cryptoeconomic security:** security model that uses economic incentives and cryptography to ensure the proper functioning and security of a network.
- **Delegation:** the process by which a Staker assigns their staked tokens to a chosen Operator, granting the Operator the authority to use the value of those tokens for validating AVSs. The Operator cannot directly access the delegated tokens, but can subject any delegated tokens to slashing by an AVS. Delegations themselves are the sum of a given Operator's delegated stake from Stakers.
- **EigenPod:** contract that is deployed on a per-user basis that facilitates native restaking.
- **Free-market governance:** EigenLayer provides an open market mechanism that allows stakers to choose which services to opt into, based on their own risk and reward analysis.
- **Liquid Staking:** a service that enables users to deposit their ETH into a staking pool and receive a liquid staking token. This token represents a claim on their ETH and its staking yield. Liquid staking tokens can be traded in the DeFi ecosystem and redeemed for their underlying ETH value after a waiting period.
- **LST Restaking:** a method where LST holders restake their Liquid Staking Tokens (LSTs) by transferring them into the EigenLayer smart contracts.
- **Native Restaking:** a method where Ethereum stakers restake their staked ETH natively by pointing their withdrawal credentials to the EigenLayer contracts.
- **On-chain slashing contract:** a smart contract deployed by service modules on EigenLayer that enforces slashing, specifying and penalizing any misbehavior.
- **Operator:** An entity that registers an Operator address on Eigenlayer to receive delegations from Stakers and run AVS infrastructure. Operators allocate their delegated stake to Operator Sets created by an AVS.
- **Operator Set:** a segmentation of Operators created by an AVS that secures a specific set of tasks for the AVS with staked assets that may be reserved for securing that set.
- **Pooled security via restaking:** when multiple parties combine their resources to provide greater security for a system. In EigenLayer, Ethereum stakers can "restake" their ETH or Liquid Staking Tokens (LST) by opting into new services built on EigenLayer.
- **Restaker**: a person who restakes Native or LST ETH to the EigenLayer protocol.
- **Rewards**: Tokens sent by AVSs to Stakers and/or Operators to compensate participation.
- **Slashing:** A penalty for improperly or inaccurately completing tasks assigned in Operator Sets by an AVS. A slashing results in a burning/loss of funds.
- **Staker:** An individual address that directly supplies assets to Eigenlayer. Such an address could be an EOA wallet or a smart contract controlled by an individual or institution.
- **Strategies**: assets that are restaked into the platform.
- **Unique Stake:** Assets made slashable exclusively by one Operator Set. Unique Stake is an accounting tool defined on the level of Operator Sets that ensures AVSs and Operators maintain key safety properties when handling staked security and slashing on EigenLayer. Unique Stake is allocated to different Operator Sets on an opt-in basis by Operators. Unique Stake represents the proportion of an Operator's delegated stake from Stakers that an AVS can slash.
- **Withdrawal:** The process through which assets are moved out of the EigenLayer protocol after safety delays and with applied slashings to the nominal amounts.

# AVS Overview

## What is an Autonomous Verifiable Service (AVS)?

An Autonomous Verifiable Service (AVS) on EigenLayer is a decentralized service built on Ethereum that provides custom verification mechanisms of off-chain operations. Please see the Intro to EigenLayer for background context on the broader EigenLayer ecosystem.

An AVS is composed of on-chain contracts for verification and an off-chain network of Operators. Operators execute the service on behalf of the AVS and then post evidence of their execution on-chain to the AVS contracts. Tasks can be initiated via on-chain contracts, off-chain via direct communication with the Operators, or via a task aggregator entity.

The design of the off-chain execution and on-chain verification is entirely flexible based on the needs of the AVS developer. 
- If the Operators perform tasks properly, the AVS can autonomously distribute rewards.
- If the Operators perform tasks maliciously, their delegate stake can be slashed autonomously by the AVS, and the Operator can be removed from the Operator set. 

Please see the original EigenLayer whitepaper EigenLayer: The Restaking Collective for further background on AVS design.

## Why Build an AVS?

Launching new Web3 projects requires substantial time and effort to bootstrap capital and operators. Builders should focus on their core product differentiators rather than bootstrapping economic security. Building an Autonomous Verifiable Service (AVS) on EigenLayer offers enhanced security, decentralization, and cost efficiency by utilizing Ethereum's staking mechanism through restaking. This allows developers to focus more on their product's core value and innovation without the significant overhead of setting up a new consensus mechanism or validator networks from scratch.

The key benefits of building an AVS on EigenLayer include:
- Security via Restaking: leverage Ethereum's staking mechanism to secure your service.
- Focus on your project's unique value: spend less time and resources accumulating economic security from scratch.
- Bootstrap your Operator network: quickly access a large network of experienced Operators.
- Decentralization and Trust: build on trust-minimized, decentralized infrastructure.
- Composability: seamlessly integrate with the broader Ethereum ecosystem.

## What Can You Build as an AVS?

The scope of AVS design is broad. It includes **any off-chain service** that can be verified on-chain. This flexibility allows AVS developers to design custom verification mechanisms suited to the unique requirements of their service. The only requirement is that some evidence for the off-chain service's execution is posted on-chain to enable verification of the service.

Examples of these services include rollup services, co-processors, cryptography services, zk Proof services, and more.`;