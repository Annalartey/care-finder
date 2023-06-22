import * as React from 'react';
import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Is health care in Ghana free?",
    answer:
      "No, but National Health Insurance (NHIS) is available for every Ghanaian.",
  },
  {
    question: "Can I have access to any hospital in Ghana?",
    answer:
      "Yes, you can have access to any hospital in Ghana.",
  },
  {
    question: "What is covered by the health insurance at Ghana Health Service?",
    answer:
      "Consultation and some medications, as well as some laboratories.",
  },
  {
    question: "How flexible are working hours at Ghana Health Service?",
    answer:
      "Work 24hours at most hospitals. Very satisfactory.",
  },
  {
    question: "What Is An Emergency?",
    answer:
      "What constitutes a medical emergency can only be ascertained by a qualified medical doctor or an attendant at a health facility. This notwithstanding, generally, a medical emergency could be said to be an acute injury or illness that poses an IMMEDIATE risk to a person’s life or long-term health.",
  },
  {
    question: "How Do I Access Health Service In A Medical Emergency Situation?",
    answer:
      "In emergency situations, you can visit any health facility.",
  },
  // More questions...
]

export default function Faqs() {
  return (
    <div id='faqs' className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
