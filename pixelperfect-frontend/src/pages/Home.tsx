import { useState} from 'react'
import { SearchSection, FilterModal, ScreenshotPreview } from "../components/index";

function Home() {
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);
    const [screenshotData, setScreenshotData] = useState(null);

    const toggleFilterModal = () => {
      setFilterModalVisible(!isFilterModalVisible);
    };
    const setScreenData = (data) =>{
      setScreenshotData(data);
    };

  
    return (
      <div className="App">
        <SearchSection toggleFilterModal={toggleFilterModal} />
        <FilterModal isVisible={isFilterModalVisible} toggleFilterModal={toggleFilterModal} setScreenData={setScreenData}/>
        <ScreenshotPreview screenshotData={screenshotData}/>
      </div>
    );
  }

export default Home
