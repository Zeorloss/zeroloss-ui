import React from 'react'

const RoadMap = () => {
    return (
        <section className='font-normal flex flex-col items-center  text-center py-20 bg-[#F5F9FF] px-4 gap-10'>
            <h2 className='text-3xl md:text-5xl font-bold'>Roadmap</h2>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q1 2023</p>
                <p>Public education/Advertising at blockchain events</p>
                <p>Token Presale</p>
                <p>Launch of ZEROLOSS DeFi dApp (ZerolossPad)</p>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q2 2023</p>
                <p>Launch Zeroloss Dex</p>
                <p>ZLT LP Locked up</p>
                <p>Public sale on ZerolossPad</p>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q3 2023</p>
                <p>Architecting of Zeroloss NFT staking platform </p>
                <p>Development of cross -chain platform on Celo. </p>
                <p>ZLT Liquidity mining </p>
            </div>
            <div className=' w-full text-white flex flex-col gap-5'>
                <span className='bg-slate-300 w-5 h-5 block m-auto rounded-full '></span>
                <div className='bg-indigo-800 py-2 w-10/12 block m-auto'>
                    <p>Q4 2023</p>
                    <p>ZLT name services</p>
                    <p>RugChecker, Stake, Smart Trade, Pool, Mine and Farm</p>
                </div>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q1 2024</p>
                <p>Launch Zeroloss Ultrade OrderBook Trading</p>
                <p>ZeroVerse GameFi (ZLT Mega League)</p>
                <p>ZLT Single Staking</p>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q2 2024</p>
                <p>Snapshot 1.0</p>
                <p>Zeroloss NFT-Fi</p>
                <p>Zeroloss NFT Staking as a Service</p>
                <p>CEX Listing</p>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q3 2024</p>
                <p>Launch Zeroloss on Internet Computer Protocol ICP</p>
                <p>Combiner Harvest Pools</p>
            </div>
            <div>
                <span className='mb-5 bg-white w-6 h-6 block m-auto rounded-full border-solid border-black border-2'></span>
                <p>Q4 2024</p>
                <p>Zeroloss AI</p>
                <p>Snapshot 2.0</p>
                <p>Start Zeroloss Airdrop distribution</p>
            </div>
        </section>
    )
}

export default RoadMap
