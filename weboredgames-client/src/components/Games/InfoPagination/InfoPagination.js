/**
* InfoPagination.js
* @author Christopher Smith
* @description
* @created 2020-05-05T15:09:35.313Z-07:00
* @copyright
* @last-modified 2020-05-05T15:18:33.235Z-07:00
*/

// ----------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import './InfoPagination.css';

// ----------------------------------------------------

const InfoPagination = ({ numberOfPages, currentPage, changeCurrentPage }) => (
  <Pagination>
    <PaginationItem disabled={currentPage === 0}>
      <PaginationLink
        onClick={() => changeCurrentPage(0)}
        first
      />
    </PaginationItem>
    <PaginationItem disabled={currentPage === 0}>
      <PaginationLink
        onClick={() => changeCurrentPage(currentPage - 1)}
        previous
      />
    </PaginationItem>
    {[...Array(numberOfPages)].map((_, index) => (
      <PaginationItem key={index} active={currentPage === index}>
        <PaginationLink onClick={() => changeCurrentPage(index)}>
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem disabled={currentPage === numberOfPages - 1}>
      <PaginationLink
        onClick={() => changeCurrentPage(currentPage + 1)}
        next
      />
    </PaginationItem>
    <PaginationItem disabled={currentPage === numberOfPages - 1}>
      <PaginationLink
        onClick={() => changeCurrentPage(numberOfPages - 1)}
        last
      />
    </PaginationItem>
  </Pagination>
);

export default InfoPagination;

// ----------------------------------------------------

InfoPagination.propTypes = {
  numberOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  changeCurrentPage: PropTypes.func
};
