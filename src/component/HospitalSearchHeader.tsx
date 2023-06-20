import * as React from 'react';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "./images/logo.png"
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Why Carefinder', href: '#why-us' },
  { name: 'Hospitals', href: "/hospital-search" },
  { name: 'FAQs', href: '#faqs' },
]

function Header() {
  const { user, handleAuthLogout } = useAuth()

  const handleLogout = async () => {
    await handleAuthLogout()
    alert("You are logging out of carefinder")
    console.log("logged out")
  }


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div>
      <header className="inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 py-0 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to='/' className="-m-1.5 p-1.5">
              <span className="sr-only">Care finder</span>
              <img
                className="h-14 w-auto lg:h-20"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            {user ? <p> signed in as {user.email}</p> : <></>}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-black">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ?
              <div className="flex py-6">
                <p>loggd in as {user.email}</p>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold leading-6 text-black">
                  Log out <span aria-hidden="true">&rarr;</span>
                </button>

              </div>
              :
              <div className="py-6">
                <Link to="signin" className="text-sm font-semibold leading-6 text-black">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            }
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-0 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link to='/' className="-m-1.5 p-1.5">
                <span className="sr-only">Care finder</span>
                <img
                  className="h-14 w-auto lg:h-20"
                  src={logo}
                  alt=""
                />
              </Link>

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>


            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {user ?
                  <div className="py-6">
                    {user.email}
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      Log out
                    </button>

                  </div>
                  :
                  <div className="py-6">
                    <Link to='/signin'
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      Log in
                    </Link>
                  </div>
                }

              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  )
}

export default Header