import React from 'react'
import Button from './Button'

const Support = () => {
  return (
    <section className='bg-white text-center px-5 py-10 md:py-40'>
      <h2 className='text-3xl font-bold mb-5'>Officially Supported Wallets</h2>
      <p>Wallets for Bep20 and ERC20 Tokens</p>
      <div className='flex flex-wrap justify-center gap-5 my-10 md:my-20'>
        <img src='/images/trustwallet.png' alt='asdflkja'  width="250px" />
        <img src='/images/metamask.png' alt='asdfasdffdlkja'  width="250px"/>
        <img src='/images/ledger.png' alt='asdflasdkja' width="250px" />
      </div>
      <Button styling="p-10"  bg="bg-yellow-400" text="Token Explored"/>
    </section>
  )
}

export default Support
