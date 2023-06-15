import * as React from 'react';

function Nav() {
  let nav = [
    {
       id: 1,
       title: "Home",
       link: "/#"
    },
    {
      id: 2,
      title: "About",
      link: "/#"
    },
    {
      id: 3,
      title: "Hospital",
      link: "/#"
    },
    {
      id: 4,
      title: "FAQs",
      link: "/#"
    }
  ]
  return (
    <div>
      {nav.map((nav) => {
        return (
          <a 
          key={nav.id}
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