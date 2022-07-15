import color from '@/components/styles/_variables.scss';

export const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: color.backgroundColor3,
        margin: '8px 8px 8px 0',
        border: 'none',
        borderRadius: '4px',
        width: 170,
        '@media screen and (max-width: 767px)': {
            ...provided['@media screen and (max-width: 767px)'],
            width: 140,
            margin: '2px',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: color.textColor2,
        border: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? color.backgroundColor2 : state.isFocused ? color.backgroundColor2 : '',
        color: color.textColor1,
        border: 'none',
        ':active': {
            backgroundColor: color.backgroundColor1,
        },
    }),
    menuList: (provided) => ({
        ...provided,
        backgroundColor: color.backgroundColor3,
        color: color.textColor1,
        overflow: 'overlay',
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: color.backgroundColor4,
            borderRadius: '4px',
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: state.isDisabled ? color.textColor2 : color.textColor1,
    }),
    indicatorSeparator: (provided) => ({
        display: 'none',
    }),
};
