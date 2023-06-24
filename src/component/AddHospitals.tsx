import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/init-firebase"
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Helmet } from 'react-helmet-async';

function AddHospitals() {
  const [hospitalName, setHospitalName] = useState("");
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [location, setLocation] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [website, setWebsite] = useState("");


  const addHospital = async (e: any) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "hospitals"), {
        name: hospitalName,
        region: region,
        town: town,
        location: location,
        openTime: openTime,
        phoneNo: phoneNo,
        website: website,

      });
      setHospitalName("")
      setRegion("")
      setTown("")
      setLocation("")
      setOpenTime("")
      setPhoneNo("")
      setWebsite("")
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="search for a hospital in Ghana" />
      </Helmet>
      <div className="flex min-h-full h-screen flex-1">
        <div className="flex flex-1 flex-row justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/">
                <img className="h-10 w-auto" src={logo} alt="Care finder" />
              </Link>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Add new hospitals
              </h2>
              <div>
                <VisibilityIcon />
                MARKDOWN
              </div>

            </div>
            <form className="space-y-6 mt-14">
              <div>
                <label
                  htmlFor="hospitalName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={hospitalName}
                    id="hospitalName"
                    name="hospitalName"
                    placeholder="Hospital Name..."
                    autoComplete=""
                    onChange={(e) => {
                      setHospitalName(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="hospitalName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Region
                </label>
                <div className="mt-2">
                  <input
                    value={region}
                    id="region"
                    name="region"
                    placeholder="Hospital Region..."
                    autoComplete=""
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="town"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City / Town
                </label>
                <div className="mt-2">
                  <input
                    value={town}
                    id="town"
                    name="town"
                    placeholder="Hospital City/ Town..."
                    autoComplete=""
                    onChange={(e) => {
                      setTown(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <div className="mt-2">
                  <input
                    value={location}
                    id="location"
                    name="location"
                    placeholder="Hospital Location..."
                    autoComplete=""
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="openTime"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Open time
                </label>
                <div className="mt-2">
                  <input
                    value={openTime}
                    id="openTime"
                    name="openTime"
                    placeholder="Hospital Working Hours..."
                    autoComplete=""
                    onChange={(e) => {
                      setOpenTime(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    value={phoneNo}
                    id="phoneNo"
                    name="phoneNo"
                    placeholder="Hospital Phone Number..."
                    autoComplete=""
                    onChange={(e) => {
                      setPhoneNo(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Hospital's website
                </label>
                <div className="mt-2">
                  <input
                    value={website}
                    id="website"
                    name="website"
                    placeholder="Hospital Website..."
                    autoComplete=""
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                onClick={addHospital}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >Add</button>
            </form>
          </div>
          <div>
            <div>
              <VisibilityIcon />
              PREVIEW
            </div>
            <div className="flex">
              <p>Name:</p>
              <ReactMarkdown children={hospitalName}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> Region: </ReactMarkdown>
              <ReactMarkdown
                children={region}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> City /Town: </ReactMarkdown>
              <ReactMarkdown
                children={town}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> Location: </ReactMarkdown>
              <ReactMarkdown
                children={location}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> Opening Time: </ReactMarkdown>
              <ReactMarkdown
                children={openTime}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> Phone Number: </ReactMarkdown>
              <ReactMarkdown
                children={phoneNo}
              />
            </div>
            <div className="flex">
              <ReactMarkdown> Hospital's Website: </ReactMarkdown>
              <ReactMarkdown
                children={website}
              />
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default AddHospitals