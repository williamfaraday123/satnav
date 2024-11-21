import Map from "../../components/Map/Map";

const Main = () => {
    const position = [51.505, -0.09]
    return(
        <div>
            <Map position = {position} />
        </div>
    );
};

export default Main;