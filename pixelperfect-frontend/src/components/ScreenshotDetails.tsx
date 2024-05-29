import { useEffect, useState } from "react";

const ScreenshotDetails = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8081/tag')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, [])
  return (
    <main className="flex flex-col items-center p-4">
      <section className="w-full max-w-screen-xl">
        <img src="../latest_perl.bmp" alt="Main Screenshot" className="w-full mb-4" />
      </section>
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl gap-4">
        <section className="flex-1">
          <img src="../latest_left.bmp" alt="Left Screenshot" className="w-full" />
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
              
              {data.map((d, i) => (
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
          
          <img src={`data:image/jpeg;base64,../assets/latest_right.bmp"`} alt="Right Screenshot" className="w-full" />
        </section>
      </div>
    </main>
  );
};

export default ScreenshotDetails;
