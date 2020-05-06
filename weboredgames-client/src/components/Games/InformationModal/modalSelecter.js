/**
* modalSelecter.js
* @author Christopher Smith
* @description Determining which game information we want to show in the modal
* @created 2020-05-05T13:43:05.997Z-07:00
* @last-modified 2020-05-05T14:54:24.261Z-07:00
*/

// ----------------------------------------------------

import React from 'react';


import CodenamesInformation from 'components/Games/Codenames/CodenamesInformation/CodenamesInformation';

// ----------------------------------------------------

export function determineModalComponent(gameName) {
  switch(gameName) {
    case "Codenames":
      return <CodenamesInformation />;

    default:
      return null;
  }
}
