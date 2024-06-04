import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ScreenshotDetails = () => {
    const { id } = useParams();
    const [screenshot, setScreenshot] = useState(null);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/screenshot/${id}`)
            .then(response => response.json())
            .then(data => setScreenshot(data))
            .catch(err => console.log(err));

        fetch(`http://localhost:8081/screentag/${id}`)
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(err => console.log(err));
    }, [id]);

    if (!screenshot) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex flex-col items-center p-4">
            <section className="w-full max-w-screen-xl">
                <img src={screenshot.Path} alt="Main Screenshot" className="w-full mb-4" />
            </section>
            <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl gap-4">
                <section className="flex-1">
                    <img src={screenshot.Path} alt="Left Screenshot" className="w-full" />
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
                            {tags.map((tag, i) => (
                                <tr key={i}>
                                    <td className="border p-2">{tag.TagID}</td>
                                    <td className="border p-2">{tag.TagName}</td>
                                    <td className="border p-2">{tag.TagValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="flex-1">
                    <img src={screenshot.Path} alt="Right Screenshot" className="w-full" />
                </section>
            </div>
        </main>
    );
};

export default ScreenshotDetails;
