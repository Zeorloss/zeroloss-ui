import React from 'react'
import Layout from '../components/Layout'

type Props = {}

const stake = (props: Props) => {
  return (
    <Layout>
        <div className='p-4 text-white'>
            <div className='flex flex-wrap justify-between'>
                <p className=' basis-full'>Stake your ZLT-BUSD LP tokens from providing liquidity in
                    the ZLT/BUSD pair on PancakeSwap and be eligible for 
                    additional rewards from the bonus staking pool! 
                    The higher your stake the higher the reward.</p>
                <img className='basis-full' src='/images/staking.png' alt='' />
            </div>

            <div className='my-4'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-3xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md bg-[#100f0f]'>
                    <div className='text-center flex flex-wrap basis-full justify-center'>
                        <div className='my-4 basis-5/12'>
                            <span>10 LP</span>
                            <p className='text-xl font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>10 LP</span>
                            <p className='text-xl font-bold'>Earned</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>21%</span>
                            <p className='text-xl font-bold'>APY</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>$12,493</span>
                            <p className='text-xl font-bold'>LP Price</p>
                        </div>
                        
                    </div>

                    <div className='basis-full'>
                        <button className=' bg-p bg-yellow-400 m-auto block text-white p-3'>Get ZLT</button>

                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-3 text-3xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full m-auto my-4'>
                            <p>Stake</p>
                            <input className='w-full bg-[#100f0f] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                        <div className='basis-full m-auto my-4'>
                            <p>Harvest</p>
                            <input className='w-full bg-[#100f0f] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                    </div>
                    <div className='basis-full text-3xl lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-4'>1.23 BUSD</p>
                        <button className='p-4 bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default stake