import React from 'react'

function Nav() {
  let nav = [
    {
       title: "Home",
       link: "/#"
    },
    {
      title: "About",
      link: "/#"
    },
    {
      title: "Hospital",
      link: "/#"
    },
    {
      title: "FAQs",
      link: "/#"
    }
  ]
  return (
    <div>
      {nav.map((nav, navIndex) => {
        return (
          <a 
          key={navIndex}
          href={nav.link}
          className=''>
            {nav.title}
          </a>
        )
      })}
    </div>
  )
}

export default Nav