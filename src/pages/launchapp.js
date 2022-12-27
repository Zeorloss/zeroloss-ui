import { Link } from 'gatsby'
import React from 'react'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { SEO } from '../components/Seo'

const launchapp = () => {
  return (
    <Layout>
        <section className="px-4 lg:h-[86vh] flex flex-wrap-reverse lg:flex-wrap justify-between items-center text-white">
            <div className='md:basis-5/12 flex flex-col flex-wrap'>
                <h1 className='text-3xl lg:text-5xl font-bold mb-4'><span className='text-[#E7BB0B]'>ZEROLOSS</span>FINANCE</h1>
                <p className='text-sm text-gray-300'>ZEROLOSS FINANCE is a DEX built for ZEROLOSS Ecosystem on Binance Smart Chain</p>
                <p className='text-[#E7BB0B] font-bold'>STAKE, LIQUIDITY MINING, DAO, Earn</p>
                <p className='text-sm text-gray-300'>Coming Soon....</p>

                <progress className='w-full my-8 bg-white rounded-md'></progress>

                <div className='flex flex-col md:flex-row md:justify-between  py-1 px-2 rounded-lg'>
                  <p className=' font-bold text-2xl pb-4 items-center'>Join ZLTchain, get OAT</p>
                  <Link className='w-40' href="https://galxe.com/Zeroloss/campaign/GCcfGUwa6P"><Button text="Mint Now" styling="p-2 rounded-lg text-black w-40" bg="bg-primary-600" /></Link>
                </div>
            </div>

            <div className='mb-10 w-full md:basis-5/12 flex justify-center md:justify-starts text-black'>
              <div className='bg-white'>
                <div id='kryptolite-swap-widget'  data-referraladdress="0x88813f879147ed09cc5c1cd61ed8daa349d7d2ab" data-basetoken="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" data-color='#E7BB0B'></div>
              </div>
            </div>
        </section>
    </Layout>
  )
}

export default launchapp

export const Head = () => (
  <SEO title="LaunchApp | Zeroloss" />
)

