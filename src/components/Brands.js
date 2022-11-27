import React from 'react'
import Button from './Button'

const Brands = () => {
  return (
    <section className='text-white  px-5 py-10'>
      <h2 className='text-3xl font-bold mb-5'>AS SEEN ON TOP INDUSTRY BRANDS</h2>
      <p>Zeroloss partners with worlds leading companys</p>
      <div className='flex flex-wrap justify-center gap-10 my-10'>
        <img src='/images/pancake.png' alt='asdflkja'  width="250px" />
        <img src='/images/dodo-logo.png' alt='asdfasdffdlkja'  width="250px"/>
        <img src='/images/ledger.png' alt='asdflasdkja' width="250px" />
        <img src='/images/dodo-logo.png' alt='asdfasdffdlkja'  width="250px"/>
      </div>
      <div>
        <span>and more exchanges...</span>
        <Button styling="p-10 py-1 px-2 rounded-md"  bg="bg-yellow-400" text="Buy ZLT"/>
      </div>
    </section>
  )
}

export default Brands
