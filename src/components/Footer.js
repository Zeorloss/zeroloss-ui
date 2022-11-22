import { Link } from 'gatsby'
import { AiFillTwitterCircle, } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { AiFillMediumCircle } from 'react-icons/ai'
import React from 'react'
import "boxicons"

const Footer = () => {
  return (
    <footer className='text-white flex flex-col flex-wrap items-center p-5'>
        <img className='max-w-[300px]' src='/images/tZeroloss-footer.png' alt='zeroloss foooter logo' />

        <div className='flex gap-10 flex-wrap text-xl p-10'>
            <Link to='/'>Launch App</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/buy">Buy</Link>
        </div>

        <div className='flex gap-10 p-16 my-10 border-solid border-slate-100 w-full border-t-[1px] border-b-[1px] justify-center items-center'>
            <AiFillTwitterCircle size="30px"/>
            <AiFillLinkedin size="30px"/>
            <AiFillMediumCircle size="30px" />
        </div>

        <div className='flex flex-wrap gap-7 sm:gap-2 justify-evenly text-center'>
            <p  className='sm:basis-3/12'>Made with ❤️ for the ZEROLOSS Community</p>
            <p className='sm:basis-3/12'>For all marketing and advertising, please contact our Marketing <Link to='mailto:teammarketing@zeroloss.finance'><strong>teammarketing@zeroloss.finance</strong></Link></p>
            <p className='sm:basis-3/12'>For general inquiries, please <Link to='mailto:contactinfo@zeroloss.finance'><strong>contactinfo@zeroloss.finance</strong></Link></p>
        </div>

    </footer>
  )
}

export default Footer
