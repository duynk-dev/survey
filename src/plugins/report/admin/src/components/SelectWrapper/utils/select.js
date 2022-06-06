import { useMemo } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

function useSelect({ isUserAllowedToEditField, isUserAllowedToReadField, name }) {

  return {
    isCreatingEntry: true,
    isFieldAllowed: true,
    isFieldReadable: true,
  };
}

export default useSelect;
