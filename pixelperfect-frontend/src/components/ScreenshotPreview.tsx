import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ScreenshotPreview = () => {
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/screenshot')
            .then(response => response.json())
            .then(data => {
                // Group screenshots by time
                const groupedScreenshots = data.reduce((acc, screenshot) => {
                    if (!acc[screenshot.Time]) {
                        acc[screenshot.Time] = [];
                    }
                    acc[screenshot.Time].push(screenshot);
                    return acc;
                }, {});

                setScreenshots(Object.values(groupedScreenshots));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="flex flex-wrap justify-center gap-5 p-4 bg-gray-900">
            {screenshots.map((group, index) => (
                <Link key={index} to={`/screenshot/${encodeURIComponent(group[0].Time)}`} className="w-1/4 bg-gray-800 text-white shadow rounded cursor-pointer transform transition-transform hover:translate-y-1">
                    <img src={group[0].Path} alt="screenshot" className="w-full" />
                    <p className="p-2 font-bold">Screenshot {group[0].Time}</p>
                </Link>
            ))}
        </section>
    );
};

export default ScreenshotPreview;
