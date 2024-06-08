import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ScreenshotDetails = () => {
    const { time } = useParams();
    const [screenshots, setScreenshots] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/screenshot?time=${time}`)
            .then(res => res.json())
            .then(data => setScreenshots(data))
            .catch(err => console.log(err));
    }, [time]);

    useEffect(() => {
        fetch('http://localhost:8081/tag')
            .then(res => res.json())
            .then(data => setTags(data))
            .catch(err => console.log(err));
    }, []);

    const leftScreenshot = screenshots.length > 0 ? screenshots.find(s => s.Side === -1) : null;
    const rightScreenshot = screenshots.length > 0 ? screenshots.find(s => s.Side === 1) : null;
    const topScreenshot = screenshots.length > 0 ? screenshots.find(s => s.Side === 0) : null;
    

    return (
        <main className="flex flex-col items-center p-4">
            <section className="w-full max-w-screen-xl">
                {topScreenshot && <img src={topScreenshot.Path} alt="Top Screenshot" className="w-full mb-4" />}
            </section>
            <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl gap-4">
                <section className="flex-1">
                    {leftScreenshot && <img src={leftScreenshot.Path} alt="Left Screenshot" className="w-full" />}
                </section>
                <section className="flex-1 bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-2xl mb-4 text-white">Screenshot-Informationen</h2>
                    <table className="w-full text-left text-white">
                        <thead>
                            <tr>
                                <th className="border p-2">Tag ID</th>
                                <th className="border p-2">Tag Name</th>
                                <th className="border p-2">Tag Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags.map((d, i) => (
                                <tr key={i}>
                                    <td className="border p-2">{d.TagID}</td>
                                    <td className="border p-2">{d.TagName}</td>
                                    <td className="border p-2">{d.TagValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="flex-1">
                    {rightScreenshot && <img src={rightScreenshot.Path} alt="Right Screenshot" className="w-full" />}
                </section>
            </div>
        </main>
    );
};

export default ScreenshotDetails;