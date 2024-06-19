import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";
import { slideUpOut } from "../animations";

const UserProfileDetails = () => {
  const user = useSelector((state) => state.user?.user);
  const [isMenu, setisMenu] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      {/* UserProfileDetails */}
      <div className=" w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-slate-900">
        {user?.photoURL ? (
          <>
            <motion.img
              whileHover={{ scale: 0.95 }}
              src={user?.photoURL}
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
          </>
        ) : (
          <p className="text-xl text-white font-semibold capitalize">
            {user?.email[0]}
          </p>
        )}
      </div>

      <motion.div
        onClick={() => setisMenu(!isMenu)}
        whileTap={{ scale: 0.9 }}
        className="p-4 rounded-md flex items-center justify-center bg-slate-900 cursor-pointer"
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>

      <AnimatePresence>
        {isMenu && (
          <motion.div
            {...slideUpOut}
            className=" bg-slate-900 absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[145px]"
          >
                <Link to={"/about"}
                  className="text-gray-400 text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                >
                  About
                </Link>
            <motion.p
              whileTap={{ scale: 0.9 }}
              onClick={signOutAction}
              className="text-gray-400 text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
