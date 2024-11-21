import { useState } from "react";
import Header from "../../components/Header/Header";
import Map from "../../components/Map/Map";

const Main = () => {
    const [selectedSearchOption, setSelectedSearchOption] = useState(null);
    const position = [51.505, -0.09]
    return(
        <div>
            <Header 
                selectedSearchOption={selectedSearchOption}
                setSelectedSearchOption={setSelectedSearchOption}
            />
            <Map 
                selectedSearchOption = {selectedSearchOption}
            />
        </div>
    );
};

export default Main;