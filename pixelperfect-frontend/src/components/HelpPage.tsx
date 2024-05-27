const HelpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 min-h-screen bg-gray-900">
      <h1 className="text-4xl text-white mb-4">Hilfe</h1>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow w-full max-w-2xl">
        <p>Willkommen auf der Hilfeseite. Hier sind einige Anweisungen, wie Sie die Seite verwenden können:</p>
        <ul className="list-disc list-inside">
          <li>Verwenden Sie die Navigation, um zwischen den Seiten zu wechseln.</li>
          <li>Im Suchbereich können Sie nach spezifischen Screenshots suchen.</li>
          <li>Verwenden Sie die Filteroptionen, um Ihre Suche zu verfeinern.</li>
          <li>Klicken Sie auf einen Screenshot, um mehr Details zu sehen.</li>
        </ul>
        <p>Wir hoffen, dass diese Anleitung Ihnen hilft, die Seite effizient zu nutzen.</p>
      </div>
    </div>
  );
};

export default HelpPage;
