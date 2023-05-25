import React from 'react'
import Layout from '../components/Layout'

type Props = {}

const stake = (props: Props) => {
  return (
    <Layout>
        <div className='p-4 text-white'>
            <div className='flex flex-wrap items-center justify-center'>
                <p className=' basis-full md:basis-5/12 text-lg'>Maximize your crypto assets and earn passive income by staking ZLT and KRL, two powerful cryptocurrencies. Our platform offers you a seamless and secure way to participate in staking, enabling you to unlock the potential of your digital investments.</p>
                <img className='basis-full md:basis-5/12' src='/images/staking.png' alt='' />
            </div>

            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full justify-center'>
                        <div className='my-4 basis-5/12 md:basis-3/12'>
                            <span>10 LP</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-5/12 md:basis-3/12'>
                            <span>21 %</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                    </div>

                    <div className='basis-full'>
                        <button className=' bg-[#f08c00] m-auto block text-white py-3 px-4'>Get ZLT</button>

                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: 10 ZLT</span> </div>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-3'>Approve</button>
                        </div>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Harvest</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-3'>Approve</button>
                        </div>
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>1.23 ZLT</p>
                        <button className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div>
            <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS NFT</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full justify-center'>
                        <div className='my-4 basis-5/12 md:basis-3/12'>
                            <span>10</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-5/12 md:basis-3/12'>
                            <span>21 %</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                    </div>

                    <div className='basis-full'>
                        <button className=' bg-[#f08c00] m-auto block text-white py-3 px-4'>Get ZLT</button>

                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-2 text-xl lg:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <div className='text-2xl font-semibold flex justify-between items-end'><span>Stake</span><span className='text-xs'>Balance: 10 ZLT</span> </div>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-3'>Approve</button>
                        </div>
                        <div className='basis-full sm:basis-5/12 max-w-[330px] bg-[#3e3d3d] p-2 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Harvest</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-3'>Approve</button>
                        </div>
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>1.23 ZLT</p>
                        <button className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div>
            
            {/* <div className='py-10 bg-[#323232] my-5 rounded-md shadow-lg w-11/12 m-auto'>
                <div className='flex gap-2 items-center'>
                    <img width={100} src='/cdn/Zeroloss logo.png' alt='' />
                    <div>
                        <p className="font-semibold text-xl">ZEROLOSS NFT</p>
                        <p className='text-slate-400'>Staking</p>
                    </div>
                </div>
                <div className='text-slate-200 font-semibold  text-xl gap-4 rounded-md flex items-center justify-center flex-wrap p-4 shadow-md '>
                    <div className='text-center flex flex-wrap basis-full justify-center'>
                        <div className='my-4 basis-5/12'>
                            <span>10 LP</span>
                            <p className='text-base font-bold'>Staked</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>1</span>
                            <p className='text-base font-bold'># Staked</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>21%</span>
                            <p className='text-base font-bold'>APY</p>
                        </div>
                        <div className='my-4 basis-5/12'>
                            <span>$12,493</span>
                            <p className='text-base font-bold'>LP Price</p>
                        </div>
                        
                    </div>

                    <div className='basis-full'>
                        <button className=' bg-[#f08c00] m-auto block text-white py-3 px-4'>Get ZLT</button>

                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center'>
                    <div className='basis-full p-3 text-xl md:basis-[60%] flex flex-wrap justify-center items-center gap-2'>
                        <div className='basis-full sm:basis-5/12 m-auto my-4'>
                            <p className='text-2xl font-semibold'>Stake</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                        <div className='basis-full m-auto my-4'>
                            <p className='text-2xl font-semibold'>Harvest</p>
                            <input placeholder='0' className='w-full bg-[#393939] p-2 my-4' type='text' />
                            <div className='flex items-center justify-center gap-3'>
                                <span className='py-2 px-4 border border-solid border-slate-500'>25%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>50%</span>
                                <span className='py-2 px-4 border border-solid border-slate-500'>100%</span>
                            </div>
                            <button className='bg-[#f08c00] p-3 rounded m-auto block my-10'>Approve</button>
                        </div>
                    </div>
                    <div className='basis-full text-lg lg:basis-[30%] text-center'>
                        <p>Pending Reward</p>
                        <p className='font-bold my-2'>1.23 ZLT</p>
                        <button className='px-4 py-3 tounded bg-white text-black font-bold'>Harvest</button>
                    </div>
                </div>
            </div> */}
        </div>
    </Layout>
  )
}

export default stake