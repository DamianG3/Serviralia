import React, { useState } from 'react';
import Select from 'react-select';


const MultiselectSkills = ({options, selectedSkills, onOptionChange}) => {

    return (
        <Select
            isMulti // Enable multi-select
            closeMenuOnSelect={false}
            isClearable={false}
            options={options}
            onChange={onOptionChange}
            value={selectedSkills}
            placeholder="Habilidades"
        />
    );
};

export default MultiselectSkills;