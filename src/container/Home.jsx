import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { MdHome } from "react-icons/md";
import { FaSearchengin } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Link, Routes, Route } from "react-router-dom";
import { Logo } from "../assets";
import { Projects, SignUp, NewProject } from "../container";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchActions";
import { RiLogoutCircleLine } from "react-icons/ri";
import { signOutAction } from "../utils/helpers";

const Home = () => {
    const [isSideMenu, setIsSideMenu] = useState(false);
    const searchTerm = useSelector((state) =>
        state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
    );
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();

    return (
        <>
            {user && (
                <div
                    className={`flex flex-col
                    ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"} 
                    min-h-screen max-h-screen relative bg-slate-900
                    px-3 py-6 transition-all duration-200 ease-in-out`}
                >
                    <div className="flex flex-col flex-1 justify-start items-center gap-4">
                        {/* Anchor */}
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSideMenu(!isSideMenu)}
                            className="w-8 h-8 bg-slate-900 rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
                            >
                            {isSideMenu === false ? <HiChevronDoubleLeft className="text-white text-xl" /> : <HiChevronDoubleLeft className="text-white text-xl rotate-180" />}
                                
                        </motion.div>
                        <div className="overflow-hidden w-full flex flex-col gap-4">
                            {/* logo */}
                            <Link to={"/home"}>
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="object-contain w-72 h-auto"
                                />
                            </Link>

                            {/* start coding */}
                            <Link to={"/newCodeEditor"}>
                                <div className=" mt-4 px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                                    <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                                        Start Coding
                                    </p>
                                </div>
                            </Link>
                            <Link to={"/newDevCodeEditor"}>
                                <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                                    <p className="text-gray-400 group-hover:text-gray-200 capitalize">
                                        Start Developing
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                        <Link
                            to={"/home/projects"}
                            className="flex items-center justify-center gap-3 mb group"
                        >
                            <RiLogoutCircleLine className="text-primaryText text-xl rotate-90 group-hover:text-white" onClick={signOutAction} />
                            <p className="text-lg text-primaryText group-hover:text-white" onClick={signOutAction}>LogOut</p>
                        </Link>
                </div>

            )}
            {/* right side section */}
            <div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12  md:py-7">
                {/* top section */}
                <div className="w-full flex items-center justify-between gap-3">
                    {/* search */}
                    <div className="bg-slate-900 w-full px-4 py-2 rounded-md flex items-center justify-center gap-3">
                        <FaSearchengin className="text-2xl text-primaryText" />
                        <input
                            type="text"
                            value={searchTerm}
                            className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-white placeholder:text-grey-600"
                            placeholder="Search here..."
                            onChange={(e) =>
                                dispatch(SET_SEARCH_TERM(e.target.value))
                            }
                        />
                    </div>

                    {/* profile section */}
                    {!user && (
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center justify-center gap-3"
                        >
                            <Link
                                to={"/home/auth"}
                                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
                            >
                                SignUp
                            </Link>
                        </motion.div>
                    )}
                    {user && <UserProfileDetails />}
                </div>

                {/* bottom section */}
                <div className="w-full">
                    <Routes>
                        <Route path="/*" element={<Projects />} />
                        <Route path="/auth" element={<SignUp />} />
                        <Route path="/newProject" element={<NewProject />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Home;
