import * as React from 'react';
import { Link } from "react-router-dom"
import { Fragment, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../lib/init-firebase"
// import { Link } from 'react-router-dom';
import HospitalSearchHeader from "./HospitalSearchHeader"
import useAuth from "../hooks/useAuth"
import ExportHospitals from './ExportHospitals';
import ExportAllHospitals from './ExportAllHospitals';
import ShareHospitals from './ShareHospitals';
import { CSVLink } from "react-csv";



function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function HospitalSearch() {
  const [hospitals, setHospitals] = useState<any[]>([])
  const [searchInput, setSearchInput] = useState<string>("")
  const [searchInputReg, setSearchInputReg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [popupContent, setPopupContent] = useState<any>([])
  const [popupToggle, setPopupToggle] = useState<boolean>(false)
  // const [menuValue, setMenuValue] = useState <string> ("")

  const csvLinkRef = React.useRef(null)

  const headers: {
    label: string;
    key: string;
  }[] = [
      { label: "Name", key: 'name' },
      { label: "District", key: "district" },
      { label: "Town", key: "town" },
      { label: "Location", key: "location" },
      { label: "Opening Time", key: "openTime" },
      { label: "Phone Number", key: "phoneNo" },
      { label: "Website", key: "website" },
    ];
  const name = popupContent.map((popup: any) => popup.data.name);
  const district = popupContent.map((popup: any) => popup.data.district);
  const town = popupContent.map((popup: any) => popup.data.town);
  const location = popupContent.map((popup: any) => popup.data.location);
  const openTime = popupContent.map((popup: any) => popup.data.openTime);
  const phoneNo = popupContent.map((popup: any) => popup.data.phoneNo);
  const website = popupContent.map((popup: any) => popup.data.website);

  const data = [
    { name: name, district: district, town, location, openTime, phoneNo, website },
  ];

  const csvData = [
    ["Name", "district", "town", "location", "phoneNo", "Website"],
    ...hospitals.map((hospital) => [
      hospital.data.name,
      hospital.data.district,
      hospital.data.town,
      hospital.data.location,
      hospital.data.phoneNo,
      hospital.data.website,
    ]),
  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'hospitals_details',
  };

  const { user } = useAuth()

  const changeHospitalContent = (hospital: []) => {
    setPopupContent([hospital])
    setPopupToggle(!popupToggle)
    console.log(hospital)
  }
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
      setLoading(false)
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
          return hosp.data.town.toLowerCase() === searchInput.toLowerCase();
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
          return hosp.data.district.toLowerCase() === searchInputReg.toLowerCase();
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
        setLoading(false)
      })
      .catch(error => console.log(error.message))
  }


  return (
    <div>
      <div>
        <HospitalSearchHeader />
      </div>

      <form>

        <div className="flex">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 lg:px-16 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
                Select_Distict
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
                        value="Accra Metropolis"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Accra Metropolis
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Tema Metropolitan"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Tema Metropolitan
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Shai Osudoku District"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Shai Osudoku District
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ada West District"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ada West District
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Kpone Katamanso"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Kpone Katamanso
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Adenta Municipal District"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Adenta Municipal District
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ablekuma West Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ablekuma West Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ablekuma North Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ablekuma North Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ayawaso North Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ayawaso North Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ayawaso West Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ayawaso West Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ga West Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ga West Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Central"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Central
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ga Central Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ga Central Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ningo Prampram District"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ningo Prampram District
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="La Nkwantanang Madina Municipal District"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        La Nkwantanang Madina Municipal District
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ada"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ada
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Ayawaso East Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Ayawaso East Municipal
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleMenuChange}
                        value="Krowor Municipal"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'group flex items-center px-4 py-2 text-sm'
                        )}
                      >
                        Krowor Municipal
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

        {loading ?
          <p>loading...</p>
          :
          <>
            {
              (hospitals.length > 0) ?
                <>
                  {hospitals.map((hospital) => {
                    return (
                      <div
                        key={hospital.id}
                        className="w-full md:w-1/2 lg:w-1/3 text-center md:text-left py-6"

                        rel="noreferrer"
                        data-aos="fade-right"
                        data-aos-delay="100"
                      >
                        <div
                          onClick={() => changeHospitalContent(hospital)}
                          className="rounded shadow-sm w-80 h-40 pb-8 bg-white mx-auto md:mr-auto md:ml-o md:mx-0 hover:shadow-lg hover:cursor-pointer ">
                          <div id='pdf-all' className="text-center">
                            <ReactMarkdown className="font-bold text-xl mt-4 mb-4 text-gray-900">
                              {hospital.data.name}
                            </ReactMarkdown>
                            <p className="text-xl text-gray-900">
                              {hospital.data.phoneNo}
                            </p>
                            <p className="text-xl text-gray-900">
                              Opening Time: {hospital.data.openTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className='lg:flex justify-between'>
                    <ExportHospitals />
                    <CSVLink
                      className="-mx-3 bg-gray-400 my-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800 text-center"
                      filename="my-file.csv"
                      data={csvData}
                    >Export to CSV</CSVLink>
                    <ShareHospitals />
                  </div>
                </>
                :
                <p> No Hospitals found. Please search for a location in Ghana </p>
            }
          </>
        }

      </div>

      {popupToggle && <div className='popup-container text-left pt-40'>
        <div className="popup-body w-full lg:w-3/5 my-48 mx-auto p-8">
          <div className='bg-white flex justify-end'>
            <p className='text-blue-600 text-lg hover:text-blue-800 hover:cursor-pointer' onClick={() => setPopupToggle(false)}>BACK <span aria-hidden="true">&rarr;</span></p>
          </div>
          {popupContent.map((pop: any) => {
            return (
              <div key={pop.id}>
                <div id="pdf">
                  <p>Name: {pop.data.name}</p>
                  <p>District: {pop.data.district}</p>
                  <p>Town / City: {pop.data.town}</p>
                  <p>Location: {pop.data.location}</p>
                  <p>Opening Time: {pop.data.openTime}</p>
                  <p>Phone Number: {pop.data.phoneNo}</p>

                  <br />
                  <a href={pop.data.website || ""} target="__blank" className='text-blue-600 hover:cursor-pointer hover:text-blue-300'>visit hospital's website</a>
                  <br />
                </div>

                <div className='lg:flex justify-between'>
                  <ExportHospitals />
                  <CSVLink
                    className="-mx-3 bg-gray-400 my-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800 text-center"
                    ref={csvLinkRef}
                    headers={csvReport.headers}
                    data={csvReport.data}
                  >Export to CSV</CSVLink>
                  <ShareHospitals />
                </div>
              </div>
            )
          })}
        </div>
      </div>}


    </div>

  )
}

export default HospitalSearch