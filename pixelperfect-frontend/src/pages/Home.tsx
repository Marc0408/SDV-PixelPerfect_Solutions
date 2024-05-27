import { useState} from 'react'
import { SearchSection, FilterModal, ScreenshotPreview, HelpPage, ScreenshotDetails } from "../components/index";

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
        <HelpPage />
        <ScreenshotDetails />
      </div>
    );
  }

export default Home
