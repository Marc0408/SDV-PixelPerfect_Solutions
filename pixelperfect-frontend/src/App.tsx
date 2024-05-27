import { useState } from 'react';
import Header from './components/Header.tsx';
import SearchSection from './components/SearchSection.tsx';
import ScreenshotPreview from './components/ScreenshotPreview.tsx';
import FilterModal from './components/FilterModal.tsx';
import HelpPage from './components/HelpPage.tsx';
import ScreenshotDetails from './components/ScreenshotDetails.tsx';

function App() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  return (
    <div className="App">
      <Header />
      <SearchSection toggleFilterModal={toggleFilterModal} />
      <FilterModal isVisible={isFilterModalVisible} toggleFilterModal={toggleFilterModal} />
      <ScreenshotPreview />
      <HelpPage />
      <ScreenshotDetails />
    </div>
  );
}

export default App;
