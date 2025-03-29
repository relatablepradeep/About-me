import React from "react"


function About(){
    return(

        <>
        <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:5/12 lg:w-5/12">
                    <img
                        src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
                        alt="image"
                    />
                </div>
                <div className="md:7/12 lg:w-6/12">
                    <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                        React development is carried out by passionate developers
                    </h2>
                    <p className="mt-6 text-gray-600">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
                        accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
                        aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
                    </p>
                    <p className="mt-4 text-gray-600">
                        Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
                        Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
                    </p>
                </div>
            </div>
        </div>
    </div>





 {/* About Me Section */}
 <div className="mt-16">
 <h1 className="text-5xl font-montserrat font-bold mb-6 tracking-wide">About Me</h1>
 <p className="text-3xl font-inter leading-relaxed text-gray-700">
   I'm Pradeep from Uttarakhand, India. I enjoy programming and
   exploring new technologies. I've participated in around 10
   hackathons, winning 3 of them along the way.
 </p>
</div>

{/* What I Do Section */}
<div className="mt-16">
 <h1 className="text-5xl font-montserrat font-bold mb-6 tracking-wide">What I do?</h1>
 <p className="text-3xl font-inter leading-relaxed text-gray-700">
   Currently, I’m working on my personal projects, including Ayurlife (medical), Oppa (manga/comic), and a college website.
 </p>
</div>

</>
    )
}

export default About;