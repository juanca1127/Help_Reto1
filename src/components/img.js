import React from "react";
const Img = ({ url, clase, data_target, data_to, aria_label }) => {
  return (
    <>
      <img
        data-bs-target={data_target}
        data-bs-slide-to={data_to}
        aria-label={aria_label}
        src={`${process.env.REACT_APP_SERVER_URL_IMG}/${url}`}
        className={clase}
        alt="..."
      />
    </>
  );
};

export default Img;
