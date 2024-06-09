import { useParams } from 'react-router-dom';
import ScreenshotDetails from '../components/ScreenshotDetails';

function ScreenshotDetailPage() {
  const { time } = useParams(); // Extrahiere den time-Parameter aus der URL
  return (
    <div>
      <ScreenshotDetails time={time} /> {/* Übergib den time-Parameter an ScreenshotDetails */}
    </div>
  );
}

export default ScreenshotDetailPage;
