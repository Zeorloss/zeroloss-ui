import React from 'react'

const BuyAndSell = () => {
  return (
    <section className='flex flex-col text-white text-center py-10'>
      <h2 className=' text-xl lg:basis-full mb-8'>Buy, Sell and Exchange ZLT</h2>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-10">
        <div className='m-auto lg:m-0 lg:basis-1/5  flex items-center px-4 py-4 border-solid border-2 border-white'>
          <img alt='dodo-logo' className='blocks ' width="150px" src={"/images/dodo-logo.png"} />
          <span>Dodoex</span>
        </div>
        <div className='m-auto lg:m-0 lg:basis-1/5 flex items-center px-4 py-4 bg-yellow-400'>
          <img alt='cBridge1' src={"/images/cBridge1.jpg"} width="150px"  />
          <span>DexTools</span>
        </div>
      </div>
      <p className='text-xl mt-8'>Earn with Zeroloss, Stake ZLT</p>
      <div className="flex m-auto items-center px-4 py-4 mt-8 bg-yellow-400">
        <img  alt="scamsniper logo" src={"/images/scamsniper.png"} width="150px" />
        <span>ScamSniper</span>
      </div>
    </section>
  )
}

export default BuyAndSell
