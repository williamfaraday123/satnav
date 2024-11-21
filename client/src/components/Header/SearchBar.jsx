const SearchBar = ({ inputValue, onInputValueChange }) => {
    return(
        <input
            placeholder = "Choose destination"
            value = {inputValue}
            onChange = {onInputValueChange}
        ></input>
    );
};

export default SearchBar;