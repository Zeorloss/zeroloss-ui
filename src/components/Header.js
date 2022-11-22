import React, { useState } from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineClose} from "react-icons/ai"


const Header = () => {
    const menuItem = ["Home", "LaunchPad", "ZeroLossPad", "Rug Checker", "LightPaper", "FAQ"]
    const [navOpen, setNavOpen] = useState(false)
    const toggle=()=> setNavOpen(!navOpen)
  return (
    <header className='bg-black text-white flex items-center px-4 py-4 relative max-w-[1300px] m-auto '>
        <img src='/images/tZeroloss_logo.png' width="80px" alt="zeroloss logo" />
        <motion.nav
            animate={{left: navOpen? 0: -700, opacity: 1}}
            initial={{left: -700, opacity: 0}}
            transition={{ ease: "easeOut", duration: .4 }}
         className={` sm:block  lg:static sm:ml-auto absolute top-[80px] h-[100vh] sm:h-min w-screen sm:w-auto bg-black `} >
            <menu className='flex flex-col sm:flex-row basis-fulls '>
                {menuItem.map((item,index)=> <li className='text-center p-5' key={index}><Link to={`/${item==="Home"? "": item.toLowerCase()}`}>{item}</Link></li>)}
            </menu>
        </motion.nav>
        <div className='ml-auto lg:ml-10 flex gap-2'>
            <Button text="Buy"/>
            <Button text="Defi" bg="bg-yellow-400"/>
            {/* <GrClose color='red' size="200px"/> */}
            {navOpen?<AiOutlineClose onClick={toggle}  color='white' size="30px"/>:<GiHamburgerMenu onClick={toggle} color="yellow" className='basis-full' size="30px" />
             }
            <div className='flex'>
            </div>
        </div>

    </header>
  )
}

export default Header