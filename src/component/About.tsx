import React from 'react'
import { Link } from 'react-router-dom'
import healthcare from "./images/healthcare.jpeg"

function About() {
  return (
    <div id='about' className="relative isolate -z-10 pt-10 lg:pt-0 overflow-hidden bg-gradient-to-b from-indigo-100/20">
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
        <div className="mx-auto max-w-7xl px-6 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
              About Carefinder.
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600">
              Good health is central to human happiness and well-being that contributes significantly to prosperity and wealth and even economic progress, as healthy populations are more productive, save more and live longer.
    This is why we at carefinder priotise your health and well-being. we make access to informations about hospitals easier for you. We bring the doctors to your door step.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/signup"
                className="rounded-md bg-blue-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get Started
              </Link>
              <Link to= "/hospital-search" className="text-sm font-semibold leading-6 text-blue-500">
                Find a Hospital Now <span aria-hidden="true">→</span>
              </Link>
            </div>
            </div>
            <img
              src={healthcare}
              alt=""
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
      {/* <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" /> */}
    </div>
  )
}

export default About