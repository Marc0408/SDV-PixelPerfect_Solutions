import { useState, useEffect } from 'react';

const ScreenshotPreview = () => {
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {
        // Beispiel für die anfängliche Anfrage, könnte später durch eine Filteranfrage ersetzt werden
        fetch('http://localhost:8081/screenshot')
            .then(response => response.json())
            .then(data => setScreenshots(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="flex flex-wrap justify-center gap-5 p-4 bg-gray-900">
            {screenshots.map((screenshot, index) => (
                <div key={index} onClick={() => window.location.href = `/screenshot/${screenshot.ScreenshotID}`} className="w-1/4 bg-gray-800 text-white shadow rounded cursor-pointer transform transition-transform hover:translate-y-1">
                    <img src={screenshot.Path} alt="screenshot" className="w-full" />
                    <p className="p-2 bg-gray-700">{screenshot.TagName}</p>
                    <p className="p-2 font-bold">Screenshot {screenshot.ScreenshotID}</p>
                </div>
            ))}
        </section>
    );
};

export default ScreenshotPreview;
