import React from "react";

const Notifications = () => {
  document.title = "Thông báo"

  return (
    <>
      <h3 className="text-xl leading-6 font-bold text-gray-900">
        Thông báo
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500">
        Kiểm tra thông báo ở đây.
      </p>
      <hr className="border-b border-grayish-blue mt-3 mb-8" />
      <div className="">
        <p className="text-xl">Không có thông báo nào</p>
      </div>
    </>
  );
};

export default Notifications;
