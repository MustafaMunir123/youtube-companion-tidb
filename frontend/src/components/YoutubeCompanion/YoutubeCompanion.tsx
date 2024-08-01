import React, { useState, useEffect } from 'react';
import BotsDataTable from '../BotsDataTable/BotsDataTable';


export const YoutubeCompanion = () => {

  return (
      <div className="flex w-full flex-col border border-gray-200 rounded-md p-6 bg-white shadow-sm gap-y-6">
        <BotsDataTable/>
      </div>
  );
};
