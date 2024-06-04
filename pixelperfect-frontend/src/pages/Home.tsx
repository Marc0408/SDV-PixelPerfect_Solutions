import { useState} from 'react'
import { SearchSection, FilterModal, ScreenshotPreview, ScreenshotDetails } from "../components/index";

function Home() {
    const [isFilterModalVisible, setFilterModalVisible] = useState(false);

    const toggleFilterModal = () => {
      setFilterModalVisible(!isFilterModalVisible);
    };
  
    return (
      <div className="App">
        <SearchSection toggleFilterModal={toggleFilterModal} />
        <FilterModal isVisible={isFilterModalVisible} toggleFilterModal={toggleFilterModal} />
        <ScreenshotPreview />
        <ScreenshotDetails />
      </div>
    );
  }

export default Home
