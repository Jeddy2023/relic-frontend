import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text, rem } from '@mantine/core';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

function Input({ label, placeholder, name, value, error, type, onChange, Icon, disabled }) {
    const icon = Icon ? <Icon style={{ width: rem(16), height: rem(16) }} /> : null;
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const IconVisibility = passwordVisible ? FaRegEye : FaRegEyeSlash;

    return (
        <div className="input_div">
            <TextInput
                label={label}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                error={!!error}
                type={type === "password" ? (passwordVisible ? "text" : "password") : type}
                leftSection={icon}
                rightSection={
                    type === "password" ? (
                        <IconVisibility
                            style={{ cursor: "pointer" }}
                            onClick={togglePasswordVisibility}
                        />
                    ) : null
                }
                disabled={disabled}
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
    type: PropTypes.string.isRequired,
    Icon: PropTypes.elementType,
    disabled: PropTypes.bool
};

Input.defaultProps = {
    Icon: null,
    disabled: false
};

export default Input;
