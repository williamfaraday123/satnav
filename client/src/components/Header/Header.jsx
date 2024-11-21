import { useEffect, useState } from "react";
import { getSearchOptions } from "../../services/SearchBarService";
import { getTemporaryUserLocation } from "./Header.hooks";
import SearchBar from "./SearchBar";
import SearchOptionsList from "./SearchOptionsList";

const Header = ({ selectedSearchOption, setSelectedSearchOption }) => {
    const [inputValue, setInputValue] = useState("");
    const [searchOptions, setSearchOptions] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const fetchSearchOptions = async () => {
            try {
                const data = await getSearchOptions(inputValue);
                setSearchOptions(data);
            } catch (err) {
                alert('Error in fetching searchOptions', err);
            }
        }
        if (inputValue)
            fetchSearchOptions();
    }, [inputValue]);

    useEffect(() => {
        if (selectedSearchOption) {
            getTemporaryUserLocation()
                .then((coords) => {
                    setUserLocation(coords);
                })
                .catch((err) => {
                    alert('Cannot get user location');
                });
            }
    }, [selectedSearchOption]);
    const handleInputValueChange = (e) => {
        setSelectedSearchOption(null); //to allow the SearchOptionsList to be visible
        setInputValue(e.target.value);
    };

    const handleSelectSearchOption = (searchOption) => {
        setSelectedSearchOption(searchOption);
    };
    return(
        <div>
            <div>Where to?</div>
            <SearchBar inputValue={inputValue} onInputValueChange={handleInputValueChange} />
            {selectedSearchOption == null ? (
                <SearchOptionsList searchOptions={searchOptions} onSelectSearchOption={handleSelectSearchOption}/>
            ) : (
                <div>
                    <div>From: {userLocation ? `${userLocation?.[0]}, ${userLocation?.[1]}`: 'Loading...'}</div>
                    <div>To: {selectedSearchOption?.properties?.country}, {selectedSearchOption?.properties?.name}</div>
                </div>
            )}
        </div>
    );
};

export default Header;