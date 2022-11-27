import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import Button from '../components/Button'
import Layout from '../components/Layout'
import Section from '../components/Section'

const launchapp = () => {
  return (
    <Layout>
        <section className="px-10 lg:h-[80vh] flex flex-wrap-reverse lg:flex-wrap justify-between items-center text-white">
            <div className='md:basis-5/12'>
                <h1 className='text-3xl lg:text-5xl font-bold mb-4'><span className='text-primary-600'>ZEROLOSS</span>FINANCE</h1>
                <p className='text-sm text-gray-300'>ZEROLOSS FINANCE is a DEX built for ZEROLOSS Ecosystem on Binance Smart Chain</p>
                <p className='text-primary-600 font-bold'>STAKE, FARM, POOL, EARN</p>
                <p className='text-sm text-gray-300'>Coming Soon....</p>

                <progress className='w-full my-8 bg-white rounded-md'></progress>

                <div className='flex justify-between items-center bg-white py-1 px-2 rounded-lg'>
                  <input type="text" name="email" placeholder='Enter your email' />
                  <Button text="Notify Me" styling="p-2 rounded-lg text-black w-32" bg="bg-primary-600" />
                </div>
            </div>

            <div className='max-w-mds w-full md:basis-5/12 '>
              <img src='/images/defi.png' alt="asasdf"/>
            </div>
        </section>
    </Layout>
  )
}

export default launchapp
