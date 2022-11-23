import React from 'react'

const BuyAndSell = () => {
  return (
    <section className='flex flex-col text-white text-center py-10 md:py-16'>
      <h2 className=' text-2xl lg:basis-full mb-8 font-bold'>Buy, Sell and Exchange ZLT</h2>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-10">
        <div className='m-auto lg:m-0 lg:basis-1/5  flex items-center px-4 py-4 border-solid border-2 border-white'>
          <img alt='dodo-logo' className='blocks ' width="150px" src={"/images/dodo-logo.png"} />
          <span className='font-bold '> Dodoex</span>
        </div>
        <div className='m-auto lg:m-0 lg:basis-1/5 flex items-center px-4 py-4 bg-yellow-400'>
          <img alt='cBridge1' src={"/images/cBridge1.jpg"} width="150px"  />
          <span className='font-bold '> DexTools</span>
        </div>
      </div>
      <p className='text-xl mt-12 font-bold'>Earn with Zeroloss, Stake ZLT</p>
      <div className="flex m-auto items-center px-4 py-4 mt-16 md:mb-24 bg-yellow-400">
        <img  alt="scamsniper logo" src={"/images/scamsniper.png"} width="150px" />
        <span>ScamSniper</span>
      </div>
    </section>
  )
}

export default BuyAndSell
