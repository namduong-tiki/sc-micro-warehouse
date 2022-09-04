import React from 'react';
import last from 'lodash/last'
import { stringify } from 'qs';
import first from 'lodash/first'
import isNaN from 'lodash/isNaN'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import { apiGet } from '@/utils/request';
import { removeNullPropertyObject } from '@/utils';

const getCategories = async (params:any) => {
    const finalParams = stringify(removeNullPropertyObject(params));
  return apiGet(
    `${process.env.REACT_APP_HOST_API}?path=catalog/categories&${finalParams}`,
    {},
    {
      hasResponseServerMessage: true,
      fullpath: true,
    }
  );
}

const CATEGORY_BODY_PARAMS = {
  limit: 1000,
  include: 'parents',
  lang: 'vi',
  parent_id: '2',
  is_active: 1,
};

const generateLabel = ({ id, name }: any) => `${id} - ${name}`;

const mapOptions = ({ name, id, is_leaf: isLeaf }:any) => ({
  value: id,
  label: `${id} - ${name}`,
  isLeaf,
});

export const useCategoryData = (value:any) => {
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState<any>({});
  const [searchText, setSearchText] = React.useState<any>(null);
  const [displayOptions, setDisplayOptions] = React.useState([]);

  React.useEffect(
    () => {
      setDisplayOptions(options);
    },
    [options]
  );

  React.useEffect(
    () => {
      const selectedCategoryId = last(value);
      if (!selectedCategoryId) {
        setLoading(true);
        setSearchText(null);
        getCategories(CATEGORY_BODY_PARAMS)
          .then(res => {
            const mappedOptions = res?.data?.map(mapOptions);
            setOptions(mappedOptions);
          })
          .finally(() => {
            setLoading(false);
          });
      } else if (isEmpty(selectedOption)) {
        setLoading(true);
        getCategories({ ...CATEGORY_BODY_PARAMS, parent_id: undefined, ids: selectedCategoryId })
          .then(res => {
            const mappedOptions = res?.data?.map(mapOptions);
            const currentCategory:any = first(mappedOptions);
            if (currentCategory) {
              setSelectedOption(currentCategory);
              setSearchText(generateLabel(currentCategory));
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setSearchText(selectedOption?.label);
      }
    },
    [value]
  );

  const loadData = (callback:any) => async (selectedOptions:any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    try {
      targetOption.loading = true;
      const categoryParams = { ...CATEGORY_BODY_PARAMS, parent_id: targetOption?.value };
      const response = await getCategories(categoryParams);
      const data = response.data || [];

      if (!isEmpty(data)) {
        targetOption.children = data.map(mapOptions);
      }
    } catch (error) {
      console.error(error);
    }

    targetOption.loading = false;
    setDisplayOptions([...displayOptions]);

    if (callback) {
      callback();
    }
  };

  const handleSearchCategories = React.useCallback(
    debounce(inputValue => {
      if (isEmpty(inputValue)) {
        setDisplayOptions(options);
      } else {
        setLoading(true);
        const isId = !isNaN(Number(inputValue));
        const params = {
          ...CATEGORY_BODY_PARAMS,
          parent_id: undefined,
          ids: isId ? inputValue : undefined,
          q: !isId ? trim(inputValue) : undefined,
        };
        getCategories(params)
          .then(res => {
            const mappedOptions = res?.data?.map(mapOptions);
            setDisplayOptions(mappedOptions);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, 500),
    [setDisplayOptions, setLoading, options]
  );

  return {
    loading,
    options,
    displayOptions,
    searchText,
    selectedOption,
    loadData,
    setSearchText,
    setSelectedOption,
    handleSearchCategories,
  };
};
