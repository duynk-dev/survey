import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import Filter from '@strapi/icons/Filter';
import { FilterListURLQuery, FilterPopoverURLQuery } from '@strapi/helper-plugin';
import { useQueryParams } from '@strapi/helper-plugin';
import SelectWrapper from '../../../../components/SelectWrapper';
import { searchFields } from './config';

const Filters = ({ displayedFilters, showSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [{ query }, setQuery] = useQueryParams();
  const { formatMessage } = useIntl();
  const buttonRef = useRef();

  const handleToggle = () => {
    setIsVisible(prev => !prev);
  };

  const handleChange = (e, data) => {
   
    const metadatas = data.metadatas;
    const value = e.target.value?.[metadatas.mainField.name];
    if(!value){
      const nextFilters = query.filters.$and.filter(prevFilter => {
        return !prevFilter[data.name];
      });
      setQuery({ filters: { $and: nextFilters }, page: 1 });
      return;
    }

    let filterToAdd= query?.filters?.$and.find(filter => {
      if(filter[data.name]){
        filter[data.name][metadatas.mainField.name]['$eq'] = value;
        return true
      }
      return false;
    });
    if(filterToAdd){
      setQuery({ filters: { $and: [...(query?.filters?.$and || [])] }, page: 1 });
    }
    else{
      filterToAdd = {
        [data.name]:{
          [metadatas.mainField.name]: {
            ['$eq']: value,
          }
        }
      };
      const filters = [...(query?.filters?.$and || []),filterToAdd];
      setQuery({ filters: { $and: filters }, page: 1 }); 
    }
  }
  const clearValue=()=>{
    
  }
  return (
    <>
      <Box paddingTop={1} paddingBottom={1}>
        <Button
          variant="tertiary"
          ref={buttonRef}
          startIcon={<Filter />}
          onClick={handleToggle}
          size="S"
        >
          {formatMessage({ id: 'app.utils.filters', defaultMessage: 'Filters' })}
        </Button>
        {isVisible && (
          <FilterPopoverURLQuery
            displayedFilters={displayedFilters}
            isVisible={isVisible}
            onToggle={handleToggle}
            source={buttonRef}
          />
        )}
      </Box>
      <FilterListURLQuery filtersSchema={displayedFilters} />
      <Flex>
      {
        showSelect && searchFields.map(item=>{
          const { name, fieldSchema, labelAction, metadatas, queryInfos } = item;
          const data = query?.filters?.$and.find(filter => {
            return filter[name];
          });
          const value = data?.[name][metadatas.mainField.name];
          return (
            <Box style={{minWidth: 200}}>
              <SelectWrapper
                  {...fieldSchema}
                  {...metadatas}
                  isCreatingEntry={false}
                  key={name}
                  description={metadatas.description}
                  intlLabel={{
                    id: metadatas.label,
                    defaultMessage: metadatas.label,
                  }}
                  labelAction={labelAction}
                  name={name}
                  relationsType={fieldSchema.relationType}
                  queryInfos={queryInfos}
                  placeholder={
                    metadatas.label
                  }
                  onChange={(e)=>handleChange(e, item)}
                  defaultValue={
                      value?.$eq?{
                      [metadatas.mainField.name]: value?.$eq
                    }: null
                  }
                />
              </Box>
          );
        })
      }
      </Flex>
    </>
  );
};

Filters.propTypes = {
  displayedFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      metadatas: PropTypes.shape({ label: PropTypes.string }),
      fieldSchema: PropTypes.shape({ type: PropTypes.string }),
    })
  ).isRequired,
};

export default Filters;
