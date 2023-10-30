import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { GetStaticPaths } from 'next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const DropDown = (props: any) => {
    return (
        <div className="col-span-6 focus:ring-red-500  md:col-span-4 z-10 rounded-full">
            <Listbox value={props.selectedElement} onChange={props.setSelectedElement}>
                <div
                    className={
                        props.text === 'noBorder'
                            ? 'bg-[#F8F8F8] relative cursor-pointer h-full'
                            : 'bg-[#F8F8F8] relative cursor-pointer rounded-full border-[1px]'
                    }
                >
                    <Listbox.Button className="relative w-full cursor-pointer rounded-full rounded-lg bg-none py-3 pl-3 pr-10  text-left">
                        <span className="block truncate pl-2 text-[0.9rem]">{props.selectedElement.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <KeyboardArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {props.displayedData.map((person: any, personIdx: number) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-5 pr-4 ${
                                            active ? 'bg-gradientSecond text-textW' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {person.name}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};
export default DropDown;
