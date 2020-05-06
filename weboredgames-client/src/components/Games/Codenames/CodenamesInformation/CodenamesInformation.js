/**
* CodenamesInformation.js
* @author Christopher Smith
* @description
* @created 2020-05-05T13:53:30.753Z-07:00
* @last-modified 2020-05-05T18:14:59.841Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';

import {
  ModalBody,
  ModalFooter
} from 'reactstrap';

import InfoPagination from 'components/Games/InfoPagination/InfoPagination';
import { infoPages } from 'components/Games/Codenames/CodenamesInformation/InfoPages';

import './CodenamesInformation.css';

// ----------------------------------------------------

const CodenamesInformation = () => {
  const [currentPage, changeCurrentPage] = useState(0);

  return (
    <>
      <ModalBody className="codenames-info-modal-body">
        {infoPages[currentPage]}
      </ModalBody>
      <ModalFooter>
        <InfoPagination
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          numberOfPages={infoPages.length}
        />
      </ModalFooter>
    </>
  );
};


export default CodenamesInformation;
