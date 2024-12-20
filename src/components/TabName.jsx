import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const TabName = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default TabName;
