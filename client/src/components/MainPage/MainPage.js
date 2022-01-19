import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Map from '../Map/Map';
import '../../scss/base/_main-page.scss';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Legend from '../Legend/Legend';

function MainPage() {
  const USER = useContext(CurrentUserContext);

  return (
    <>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      > */}
      <div className="main-page">
        <h1 className="hello-header">
          Witaj
          {' '}
          {USER.userInfo.name}
        </h1>
        <div>
          <Map />
          <Legend />
        </div>
      </div>
      {/* </motion.div> */}
    </>
  );
}

export default MainPage;
