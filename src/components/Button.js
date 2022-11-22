import React from 'react'

const Button = ({text, styling, bg, action}) => {
  return (
    <button onClick={action} className={`${bg?bg: "bg-black"} ${styling}  py-1 px-2 rounded-md `}>{text}</button>
  )
}

export default Button
