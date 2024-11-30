const RoutingOptions = ({ setProfile }) => {
    const profiles = ["car", "bike", "foot"];
    return(
        <>
            {profiles.map((profile, index) => (
                <button
                    key={index}
                    onClick={() => {
                        setProfile(profile);
                    }}
                >{profile}</button>
            ))}
        </>
    );
};

export default RoutingOptions