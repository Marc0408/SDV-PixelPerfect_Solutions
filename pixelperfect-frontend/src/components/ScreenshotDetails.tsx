const ScreenshotDetails = () => {
  return (
    <main className="flex flex-col items-center p-4">
      <section className="w-full max-w-screen-xl">
        <img src="latest_perl.bmp" alt="Main Screenshot" className="w-full mb-4" />
      </section>
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl gap-4">
        <section className="flex-1">
          <img src="latest_left.bmp" alt="Left Screenshot" className="w-full" />
        </section>
        <section className="flex-1 bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-2xl mb-4 text-white">Screenshot-Informationen</h2>
          <table className="w-full text-left text-white">
            <thead>
              <tr>
                <th className="border p-2">Filter</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Menu</td>
                <td className="border p-2">Menu 1</td>
              </tr>
              <tr>
                <td className="border p-2">Gebiete</td>
                <td className="border p-2">KVV</td>
              </tr>
              <tr>
                <td className="border p-2">Sprachen</td>
                <td className="border p-2">Deutsch</td>
              </tr>
              {/* Weitere Filterinformationen hier */}
            </tbody>
          </table>
        </section>
        <section className="flex-1">
          <img src="latest_right.bmp" alt="Right Screenshot" className="w-full" />
        </section>
      </div>
    </main>
  );
};

export default ScreenshotDetails;
