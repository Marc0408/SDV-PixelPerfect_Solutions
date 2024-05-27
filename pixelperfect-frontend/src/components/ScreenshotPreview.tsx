import logo from '../assets/logo.png';

const ScreenshotPreview = () => {
  const screenshots = Array(16).fill({
    src: logo,
    tags: 'Tag1',
    name: 'Screenshot 1',
    link: 'screenshot'
  });

  return (
    <section className="flex flex-wrap justify-center gap-5 p-4">
      {screenshots.map((screenshot, index) => (
        <div key={index} onClick={() => window.location.href = screenshot.link} className="w-1/4 bg-gray-800 text-white shadow rounded cursor-pointer transform transition-transform hover:translate-y-1">
          <img src={screenshot.src} alt="screenshot" className="w-full" />
          <p className="p-2 bg-gray-700">{screenshot.tags}</p>
          <p className="p-2 font-bold">{screenshot.name}</p>
        </div>
      ))}
    </section>
  );
};

export default ScreenshotPreview;
