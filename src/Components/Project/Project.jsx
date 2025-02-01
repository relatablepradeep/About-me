import React, { useState } from 'react';
import { Link, NavLink } from 'react-router'; // Corrected import from 'react-router-dom'

function Project() {
    const Work = [
        {
            id: 1,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
        {
            id: 2,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
        {
            id: 3,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
        {
            id: 4,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
        {
            id: 5,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
        {
            id: 6,
            title: "Onicha",
            description: "hiiii i am just making it randimely right now and i dont know what should i write",
        },
    ];

    const [div, Setdiv] = useState({ width: 10, height: 10 });

    return (
        <>
            <section className="flex justify-center">
                <div className="">
                    
                    <div className="top-15 text-xl flex items-center justify-center space-x-8"> 
                        <button className="border-2 rounded-md border-black">
                            ok
                        </button>

                        <h3 className="text-8xl">My Work</h3>

                        <button className="border-2 rounded-md border-black">
                            ok
                        </button>
                    </div>

                    <div className="flex  hover:bg-white">

                    <div className=" m-10 flex justify-center  text-white ">
                        <div className="bg-black h-96 w-[500px]   ">{Work.title}</div>
                    </div>

                    <div className=" m-10">
                        <div className="bg-black h-96 w-[500px]   ">{Work.title}</div>
                    </div>

                    <div className=" m-10">
                        <div className="bg-black h-96 w-[500px]   ">{Work.id}</div>
                    </div>

                    <div className=" m-10">
                        <div className="bg-black h-96 w-[500px] "></div>
                    </div>

                    <div className=" m-10">
                        <div className="bg-black h-96 w-[500px] "></div>
                    </div>

                    <div className=" m-10">
                        <div className="bg-black h-96 w-[500px] "></div>
                    </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Project;