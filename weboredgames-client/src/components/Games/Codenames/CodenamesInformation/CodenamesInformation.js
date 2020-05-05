/**
* CodenamesInformation.js
* @author Christopher Smith
* @description
* @created 2020-05-05T13:53:30.753Z-07:00
* @last-modified 2020-05-05T15:13:59.132Z-07:00
*/

// ----------------------------------------------------

import React, { useState } from 'react';

import {
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import InfoPagination from 'components/Games/InfoPagination/InfoPagination';

import './CodenamesInformation.css';

// ----------------------------------------------------

const CodenamesInformation = () => {

  const [currentPage, changeCurrentPage] = useState(0);

  const informationPages = ["Hello", "World", "How", "Are", "You"].map(word => (
    <p key={word}>{word}</p>
  ));

  return (
    <>
      <ModalBody>
        {informationPages[currentPage]}
      </ModalBody>
      <ModalFooter>
        <InfoPagination
          currentPage={currentPage}
          changeCurrentPage={changeCurrentPage}
          numberOfPages={informationPages.length}
        />
      </ModalFooter>
    </>
  );
};


export default CodenamesInformation;
