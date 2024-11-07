import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const MyAccount = () => {
  document.title = "Tài khoản";
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <AnimatePresence>
      <h3 className="text-xl leading-6 font-bold text-gray-900">Tài khoản</h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">
        Thông tin cá nhân.
      </p>
      <hr className="border-b border-grayish-blue mt-3 mb-8" />
      <dl className="grid grid-cols-1 gap-x-4 sm:grid-cols-1 divide-y divide-gray-200">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sm:grid sm:grid-cols-3 sm:gap-4 py-4"
        >
          <dt className="text-sm font-medium text-dark-grayish-blue px-2">
            Họ và tên
          </dt>
          <dd className="mt-1 flex text-sm text-very-dark-blue sm:mt-0 sm:col-span-2">
            <span className="sm:flex flex-grow px-2">
              {userInfo.firstname} {userInfo.lastname}
            </span>
          </dd>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="sm:grid sm:grid-cols-3 sm:gap-4 py-4"
        >
          <dt className="text-sm font-medium text-dark-grayish-blue px-2">
            Email
          </dt>
          <dd className="mt-1 flex text-sm text-very-dark-blue sm:mt-0 sm:col-span-2 px-2">
            {userInfo.email}
          </dd>
        </motion.div>
        {userInfo.phone ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="sm:grid sm:grid-cols-3 sm:gap-4 py-4"
          >
            <dt className="text-sm font-medium text-dark-grayish-blue px-2">
              Số điện thoại
            </dt>
            <dd className="mt-1 flex text-sm text-very-dark-blue sm:mt-0 sm:col-span-2 px-2">
              {userInfo.phone}
            </dd>
          </motion.div>
        ) : (
          ""
        )}
        {userInfo.gender ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="sm:grid sm:grid-cols-3 sm:gap-4 py-4"
          >
            <dt className="text-sm font-medium text-dark-grayish-blue px-2">
              Giới tính
            </dt>
            <dd className="mt-1 flex text-sm text-very-dark-blue sm:mt-0 sm:col-span-2 px-2">
              {userInfo.gender}
            </dd>
          </motion.div>
        ) : (
          ""
        )}
      </dl>
    </AnimatePresence>
  );
};

export default MyAccount;
