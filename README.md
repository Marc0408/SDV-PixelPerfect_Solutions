# PixelPerfect-Solutions

PixelPerfect-Solutions ist eine Web-Applikation, die einen Datensatz aus Bildern im Backend ausliest, kategorisiert und schließlich im Frontend mit Filtern visualisiert. Das Projekt wurde im Rahmen des Seminars für SoftwareDesign an der Hochschule Furtwangen erstellt.

## Teilnehmer

Das Projekt wurde geführt von Marvin Veltz, Marc Sutter, Daniel Kelesov

## Inhalt

- [Vorbereitung](#vorbereitung)
- [Installation](#installation)
- [Benutzung](#benutzung)
- [Features](#features)
- [Systemanforderungen](#systemanforderungen)


## Vorbereitung

### Voraussetzungen
- download and install github
- download and install NodeJS (NPM)
- download and install python (Version: x.x.x)
- download and install xammp

### Aufsetzen der Virtuellen Umgebung
Zuerst müssen wir Python 3 von [python.org](https://www.python.org/downloads/) herunterladen und installieren. Die empfohlene Version ist `3.10.7` oder höher. Dann können wir den folgenden Terminalbefehl verwenden, um die aktuell installierte Version zu überprüfen:

```shell
python --version
```

Normalerweise beinhaltet die Python-Installation das Abhängigkeitsverwaltungstool pip standardmäßig. Falls nicht, laden Sie es herunter und installieren Sie es von [pip.pypa.io](https://pip.pypa.io/en/stable/installation/). Die minimal erforderliche Version ist `19.3` oder höher. Wir können erneut einen Terminalbefehl verwenden, um die Version zu überprüfen:

```shell
pip --version
```

Wenn Sie Ihre pip-Version aktualisieren müssen, verwenden Sie

```shell
python -m pip install --upgrade pip
```

## Installation

Um PixelPerfect-Solutions lokal zu installieren, folgen Sie diesen Schritten:

1. **Repository klonen**:
    ```bash
    git clone https://github.com/Marc0408/SDV-PixelPerfect_Solutions.git
    cd SDV-PixelPerfect_Solutions
    ```
    Alternativ kann man das Repository über Github Desktop clonen oder als ZIP herunterladen.

2. Python Virtual Environment
    Um sicherzustellen, dass der Code auf verschiedenen Maschinen funktioniert, wird eine virtuelle Umgebung benötigt. Der folgende Terminalbefehl erstellt den versteckten Ordner ``` .venv ``` in dem SDV-        PixelPerfect_Solutions\pixelperfect-backend\ Ordner:

    ```
    python -m venv .venv
    ```

    Als nächstes muss das VENV aktiviert werden. Das VENV wird nur für die aktuelle Terminalsitzung aktiv sein. Das Schließen und erneute Öffnen des Terminals wird das VENV deaktivieren. Stellen Sie also immer sicher, dass Sie es aktivieren, bevor Sie den Code verwenden.

    ```
    .venv\Scripts\activate
    ```

    In der virtuellen Umgebung müssen nun die requierements installiert werden:

    ```
    pip install -r requirements.txt
    ```
3. Installation der Datenbank und Aufsetzen des Datensatzes
    In XAMMP muss nun MySQL gestartet werden.
    Im Anschluss braucht man folgenden Befehl um das erste Script zu starten:
   ```
   python database_init.py
   ```
   Nun müssen die Bilder zum analysieren in den pixelperfect-frontend\src\screenshotfolder\ Ordner. Hierbei muss man darauf achten dass nur Bilddatein in diesem Ordner sind.
   Darauf hin muss das zweite und letzte Python script in der virtuellen Umgebung ausgeführt werden.
   ```
   python main_script.py -p [Pfad zu den Screenshots]
   ```
   Der Pfad kann zum beispiel so aussehen:
   ```
   'C:\\SDV-PixelPerfect_Solutions\\pixelperfect-frontend\\src\\screenshotfolder\\smmiMai'
   ```

4. **Abhängigkeiten installieren**:
    Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) und [npm](https://www.npmjs.com/) installiert haben.
    Im Frontend Ordner und Backend geben sie folgendes ein (zuvor in einer Console reinnavigieren)
    ```bash
    npm install
    ```
    Dies installiert alle Abhängigkeiten, die das Frontend und Backend benötigten.

5. **Backend starten** 
    Stellen Sie sicher dass Sie sich im Terminal im Backend befinden und führen Sie folgenden Befehl aus:
    ```bash
    npm start
    ```

7. **Frontend starten**:
    Stellen Sie sicher dass Sie sich im Terminal im Backend befinden und führen Sie folgenden Befehl aus:
    ```bash
    npm run dev
    ```
    Dies startet die Applikation auf dem Localhost.


## Benutzung

Nach der Installation und dem Starten der Anwendung können Sie auf die Web-Applikation über Ihren Webbrowser zugreifen. Standardmäßig läuft der Server auf `http://localhost:5173`.
Sie können die Filteroptionen im Frontend verwenden, um die Bilder nach verschiedenen Kategorien zu filtern und zu visualisieren.

## Features

- **Bildverarbeitung im Backend**: Automatisches Auslesen und Kategorisieren von Bildern.
- **Filteroptionen im Frontend**: Interaktive Filter zum Durchsuchen und Visualisieren der Bilder.
- **Benutzerfreundliche Oberfläche**: Intuitive Bedienung der Web-Applikation.

## Systemanforderungen

- **Betriebssystem**: Windows (auf anderen Betriebssystemen wurde nicht getestet)
- **Python** : 
- **Node.js**: Version 12 oder höher
- **npm**: Version 6 oder höher
- **XAMPP** :

## Module

Folgende Module wurden für das Projekt verwendet:

Frontend:
- **React+Vite**

Backend:
- **mysql-connector-python** Version 8.4.0 - 
- **pillow** Version 10.3.0 - **Python Imaging Library**

## Bekannte Probleme

Hier werden folgende Probleme oder Bugs aufgelistet, die während der Entwicklung aufgetaucht sind und wie man diese beheben kann.

1. **Bug**: Bilder werden nicht angezeigt, da sie nicht mit der Zeitzone vom eigenen Computer übereinstimmen

**Lösung**: In den Systemeinstellung die automatische Zeizonen erkennung ausschalten, die Zeitzone manuell einstellen und der Schalter für "Automatisch an die Sommerzeit anpassen" aktivieren


---
