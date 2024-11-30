import { useState } from "react";
import Header from "../../components/Header/Header";
import Map from "../../components/Map/Map";

const Main = () => {
    const [selectedSearchOption, setSelectedSearchOption] = useState(null);
    const [profile, setProfile] = useState("driving");

    return(
        <div>
            <Header 
                selectedSearchOption={selectedSearchOption}
                setSelectedSearchOption={setSelectedSearchOption}
                setProfile={setProfile}
            />
            <Map 
                selectedSearchOption = {selectedSearchOption}
                profile={profile}
            />
        </div>
    );
};

export default Main;