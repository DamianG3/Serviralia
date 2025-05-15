

const PrettySkills = ({ skills }) => {

    
    return (
        <div className="col-12 mt-2">
            {
                // console.log(skill);
                skills?.map((skill) => (
                    <span className="botonplom">{skill}</span>
                ))
            }
            {/* <span className="botonplom">Plomería</span> */}
            {/* <span className="botonplom">Plomería</span> */}

        </div>
    );
};

export default PrettySkills;