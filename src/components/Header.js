import React, { useState } from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineClose} from "react-icons/ai"
import { menuItem } from '../data/content'

const Header = () => {
    const [navOpen, setNavOpen] = useState(false)
    const toggle=()=> setNavOpen(!navOpen)
  return (
    <header className='bg-black text-white flex items-center px-4 py-4 relative max-w-[1300px] m-auto '>
        <Link to='/'>
            <img src='/images/tZeroloss_logo.png' width="80px" alt="zeroloss logo" />
        </Link>
        <motion.nav
            animate={{left: navOpen? 0: -1000, opacity: 1}}
            initial={{left: -1000, opacity: 0}}
            transition={{ ease: "easeOut", duration: .4 }}
         className={` sm:block  lg:static sm:ml-auto absolute top-[80px] h-[100vh] sm:h-min w-screen sm:w-auto bg-black z-50`} >
            <menu className='flex flex-col sm:flex-row basis-fulls '>
                {menuItem.map((item,index)=> <li className='text-center p-5 text-xl' key={index}><Link to={item.url.toLowerCase()}>{item.linkText}</Link></li>)}
            </menu>
        </motion.nav>
        <div className='ml-auto lg:ml-10 flex gap-2'>
            <Link to='/buy'>
                <Button text="Buy"/>
            </Link>
            <Link to="/launchapp">
                <Button text="Defi" bg="bg-yellow-400 " styling="py-1 px-2 rounded-md py-1 px-2"/>
            </Link>
            {/* <GrClose color='red' size="200px"/> */}
            {navOpen?<AiOutlineClose onClick={toggle} className="md:hidden"  color='white' size="30px"/>:<GiHamburgerMenu onClick={toggle} color="yellow" className='basis-full md:invisible' size="30px" />
             }
            <div className='flex'>
            </div>
        </div>

    </header>
  )
}

export default Header