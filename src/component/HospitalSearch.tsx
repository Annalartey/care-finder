import * as React from 'react';
import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../lib/init-firebase"
// import { Link } from 'react-router-dom';
import Header from "./Header"


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function HospitalSearch() {
  const [hospitals, setHospitals] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchInputReg, setSearchInputReg] = useState<string>("")
  // const [menuValue, setMenuValue] = useState <string> ("")

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  };

  const handleMenuChange = (e: any) => {
    e.preventDefault()
    setSearchInputReg(e.target.value)
    searchHospitalsRegion();

  }

  const handleClick = (e: any) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      console.log(searchInput)
      searchHospitalsTown();
      setSearchInput("")
    } else {
      alert("please input a town found in a region in Ghana")
    }

  };

  useEffect(() => {
    getHospitals()
  }, [])

  useEffect(() => {
    console.log(hospitals)
  }, [hospitals])


  function searchHospitalsTown() {
    const hospitalCollectionRef = collection(db, 'hospitals')
    getDocs(hospitalCollectionRef)
      .then(response => {
        const hosp: any = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
        }))
        const result = hosp.filter((hosp: any) => {
          return hosp.data.location.toLowerCase() === searchInput.toLowerCase();
        });
        console.log(result)
        setHospitals(result)
      })
      .catch(error => console.log(error.message))
  }

  function searchHospitalsRegion() {
    const hospitalCollectionRef = collection(db, 'hospitals')
    getDocs(hospitalCollectionRef)
      .then(response => {
        const hosp: any = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
        }))
        const result = hosp.filter((hosp: any) => {
          return hosp.data.region.toLowerCase() === searchInputReg.toLowerCase();
        });
        console.log(result)
        setHospitals(result)
      })
      .catch(error => console.log(error.message))
  }

  function getHospitals() {
    const hospitalCollectionRef = collection(db, 'hospitals')
    getDocs(hospitalCollectionRef)
      .then(response => {
        const hosp: any = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
        }))
        setHospitals(hosp)
      })
      .catch(error => console.log(error.message))
  }


  return (
    <div>
      <div>
        <Header />
      </div>

      <form>

        <div className="flex">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 lg:px-16 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                Select_Region
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="greater accra"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Greater Accra
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="eastern region"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Eastern Region
                      </button>
                    )}
                  </Menu.Item>

                </div>
              </Menu.Items>
            </Transition>
          </Menu>








          <div className="relative w-full">
            <input type="search" value={searchInput} onChange={handleChange} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Hospitals in specific towns..." required />
            <button type="submit" onClick={handleClick} className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>










      <div className="lg:mx-40 flex flex-col md:flex-row flex-wrap">
        {hospitals.map((hospital, id) => {
          return (
            <a
              key={hospital.id}
              className="w-full md:w-1/2 lg:w-1/3 text-center md:text-left py-6"
              href={hospital.data.website || ""}
              target="__blank"
              rel="noreferrer"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="rounded shadow-lg w-80 pb-8 bg-white mx-auto md:mr-auto md:ml-o md:mx-0 ">
                <div
                  style={{ backgroundImage: `url(${hospital.image})` }}
                  className="bg-center bg-cover shadow-sm w-80 h-72 mx-auto md:mr-auto md:ml-o md:mx-0 "
                ></div>

                <div className="text-center">
                  <h1 className="font-bold text-xl mt-4 mb-4 text-gray-900">
                    {hospital.data.name}
                  </h1>
                  <p className="text-xl text-gray-900">
                    Opens {hospital.data.openTime}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>


    </div>

  )
}

export default HospitalSearch