import React, {useEffect} from 'react';
import {Form, Select} from "antd";
import PropTypes from "prop-types";

export const SelectOptions = (props) => {
    useEffect(() => {
        console.log('useEffect in select ',value);
    })
    const {
        selectName: name,
        selectValue: value,
        selectPlaceholder: placeholder,
        onChangeMethod: handleChange,
        selectLabel: label,
        optionList: options,
        selectRequired: required} = props;
    return (
        <Form.Item rules={[{required: required, message: {placeholder}}]} name={name} label={label}>
            <Select value={value||undefined} placeholder={placeholder}
                    onChange={val => handleChange({target: {name: name, value: val}})}>
                {options?.map(option => {
                    return(
                        <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                    )
                })}
            </Select>
        </Form.Item>
    )
}

SelectOptions.propTypes = {
    selectName: PropTypes.string,
    selectValue: PropTypes.any,
    selectPlaceholder: PropTypes.string,
    selectLabel: PropTypes.string,
    selectRequired: PropTypes.bool,
    optionList : PropTypes.array,
    onChangeMethod: () => {},
}
