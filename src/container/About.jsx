import React from "react";
import { Logo, member4, member1, member3, member2, AboutImg } from "../assets";
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
    const members = [
        {
            name: "Rajnish Kumar Yadav",
            email: "rajnishking84@gmail.com",
            github: "https://github.com/Mr-RajniX",
            linkedIn: "https://linkedin.com/in/mr-rajnix",
            image: member1,
        },
        {
            name: "Shilpa Prasad",
            email: "shilpaprasad89060@gmail.com",
            github: "https://github.com/shilpa0408",
            linkedIn: "https://linkedin.com/shilpa_prasad",
            image: member2,
        },
        {
            name: "Ankit Kumar Barnwal",
            email: "ankitbaranwal37@gmail.com",
            github: "https://github.com/Ankit-37",
            linkedIn: "https://linkedin.com/in/ankit-kumar-baranwal-121953225",
            image: member3,
        },
        {
            name: "Abhinash Singh",
            email: "singhabhinas861@gmail.com",
            github: "https://github.com/Abhinash33",
            linkedIn: "https://linkedin.com/in/abhinash-singh-927a16185/",
            image: member4,
        },
    ];

    return (
        <div className="w-full min-h-screen overflow-y-scroll max-h-screen h-full bg-slate-900 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <Link to={"/home"}>
                        <img src={Logo} alt="Logo" className="h-20" />
                    </Link>
                    <h1 className="text-3xl py-10 font-semibold text-white mb-10">
                        <ReactTyped
                            strings={["Do Code Learn More. . ."]}
                            typeSpeed={250}
                            loop
                        />
                    </h1>
                </div>
                <div className="p-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold text-gray-400 dark:text-gray-100">
                                About
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">
                                Code editors allow a Developer to write
                                error-free code more efficiently. They come
                                equipped with features that facilitate the
                                coding process. These features include syntax
                                highlighting, automatic indentation,
                                error-checking, autocomplete, and code snippets.
                                You can use it for both programming and web
                                development. The main objective of an online
                                compiler and code editor is to implement code
                                without installing a compiler on the system,
                                directly compiling and running the code.
                            </p>
                            <Link to={"/home"}>
                                <button className="bg-green-500 text-white px-6 py-3 mt-10 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                    Start Coding
                                </button>
                            </Link>
                        </div>
                        <div className="mt-8 md:mt-0 flex justify-center">
                            <div className="relative">
                                <img
                                    src={AboutImg}
                                    alt="coding"
                                    className="rounded-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-300 rounded-full mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-2xl text-gray-400 mb-6 text-center">
                    || Team Members ||
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {members.map((member, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-gray-300"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mb-4 transform transition-transform duration-300 hover:scale-150 cursor-pointer"
                            />
                            <div className="text-center">
                                <p className="font-semibold text-xl">
                                    {member.name}
                                </p>
                                <p className="flex items-center justify-center hover:text-green-500 transition-colors duration-300 cursor-pointer">
                                    <FaEnvelope className="mr-1" />
                                    {member.email}
                                </p>
                                <Link to={member.github} target="_blank">
                                    <p className="flex items-center justify-center hover:text-green-500 transition-colors duration-300">
                                        <FaGithub className="mr-1" />
                                        {member.github}
                                    </p>
                                </Link>
                                <Link to={member.linkedIn} target="_blank">
                                    <p className="flex items-center justify-center hover:text-green-500 transition-colors duration-300">
                                        <FaLinkedin className="mr-1" />
                                        {member.linkedIn}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
