import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import last from 'lodash/last'
import { ArrowDownOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
import { useCategoryData } from './useCategoryData';

const alwaysDisplayHorizontalScrollbar = css`
  overflow-x: scroll;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const SIZE_HEIGHT_MAPPING:any = {
  small: '24px',
  default: '32px',
  large: '40px',
};

const SIZE_ARROW_MAPPING:any = {
  small: '8px',
  default: '10px',
  large: '14px',
};

const CASCADER_OVERLAY_CLASS_NAME = 'category-cascader-overlay';

const OverlayCascader = ({ cascaderRef, className, ...props }:any) => {
  return (
    <Cascader
      ref={cascaderRef}
      popupClassName={`${CASCADER_OVERLAY_CLASS_NAME} ${className}`}
      className={className}
      {...props}
    />
  );
}

const ArrowDown = styled(ArrowDownOutlined)``;

interface Props {
  [any: string]: any
}

const Container = styled.div<Props>`
  position: relative;
  height: ${({ size }:any) => SIZE_HEIGHT_MAPPING[size]};

  /* ${ArrowDown} {
    z-index: 100;
    position: absolute;
    top: ${({ size }:any) => SIZE_ARROW_MAPPING[size]};
    right: 11px;
    font-size: 12px;
    line-height: 14px;
    color: rgba(0, 0, 0, 0.25);
  } */
`;

// const StyledInput = styled(Input)`
//   &.ant-input {
//     z-index: 99;
//     position: absolute;
//     top: 0;
//     left: 0;
//   }
// `;

const StyledCascader = styled(OverlayCascader)`
  &&& {
    &.ant-cascader-picker {
      z-index: 98;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    &.ant-cascader-menus {
      position: relative;
      width: fit-content;
      max-width: 660px;
      ${alwaysDisplayHorizontalScrollbar};
      .ant-cascader-menu {
        min-width: 110px;
      }

      &:before {
        position: absolute;
        z-index: 2;
        display: ${({ loading }) => (loading ? 'flex' : 'none')};
        justify-content: center;
        align-items: center;
        content: 'loading';
        width: 100%;
        height: -webkit-fill-available;
        background: rgba(255, 255, 255, 0.7);
      }
    }

    @media only screen and (max-width: 992px) {
      &.ant-cascader-menus{
        max-width: 300px;
        .ant-cascader-menu {
          max-width: 300px;
        }
      }
    }
  }
`;

const CategoriesCascader = (props:any) => {
  
  const {
    size = 'default',
    value,
    onChange,
    placeholder = 
      'Vui lòng chọn'
  } = props;
  // const inputProps = omit(props, ['onChange', 'value']);
  const cascaderRef = useRef<any>();
  const {
    loading,
    displayOptions,
    // searchText,
    loadData,
    setSearchText,
    setSelectedOption,
    // handleSearchCategories,
  } = useCategoryData(value);

  const displayRender = (labels:any) => {
    return last(labels);
  };

  const scrollToView = () => {
    const cascaderOverlay = document.querySelector(`.${CASCADER_OVERLAY_CLASS_NAME}`);
    if (cascaderOverlay) {
      // eslint-disable-next-line prefer-destructuring
      const scrollWidth = cascaderOverlay.scrollWidth;
      cascaderOverlay.scrollTo({
        left: scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  // const handleFocus = () => {
  //   const cascaderInput = cascaderRef?.current?.input?.input;
  //   if (cascaderInput) {
  //     cascaderInput.click();
  //   }
  // };

  // const onSearchCategories = (e:any) => {
  //   const inputValue = e.target.value;
  //   setSearchText(inputValue);
  //   handleSearchCategories(inputValue);
  // };

  // const handleInputKeyDown = (e:any) => {
  //   const inputValue = e.target.value;
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     handleSearchCategories(inputValue);
  //   }
  // };

  const onCascaderChange = (val:any, selectedOptions:any) => {
    const selectedCategory:any = last(selectedOptions);
    setSelectedOption(selectedCategory);

    onChange && onChange(val, selectedOptions);
    const currentSelectedLabel = selectedCategory?.label;
    setSearchText(currentSelectedLabel);
  };


   const filter = (inputValue:any, path:any) => path.some((option:any) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

  return (
    <Container size={size}>
      <StyledCascader
      style={{width:'100%'}}
        loading={loading}
        cascaderRef={cascaderRef}
        placeholder={placeholder}
        options={displayOptions}
        loadData={loadData(scrollToView)}
        displayRender={displayRender}
        changeOnSelect
        {...props}
        onChange={onCascaderChange}
        showSearch={{
          filter,
        }}
      />
    </Container>
  );
};

export default CategoriesCascader;
