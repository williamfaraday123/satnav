const RoutingOptions = ({ setProfile }) => {
    const profiles = ["driving", "walking", "cycling"];
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