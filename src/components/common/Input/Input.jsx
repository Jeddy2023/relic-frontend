import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text } from '@mantine/core';

function Input({ label, placeholder, name, value, error, type, onChange }) {

    return (
        <div className="input_div">
            <TextInput
                label={label}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                error={!!error}
                type={type}
            />
            {error && (
                <Text size="sm" color="red">
                    {error}
                </Text>
            )}
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired
}

export default Input;
