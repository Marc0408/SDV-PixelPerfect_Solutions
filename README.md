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
- [Lizenz](#lizenz)


## Vorbereitung

### Voraussetzungen

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


### Python Virtual Environment

Um sicherzustellen, dass der Code auf verschiedenen Maschinen funktioniert, wird eine virtuelle Umgebung benötigt. Der folgende Terminalbefehl erstellt den versteckten Ordner ``` .venv ``` in Ihrem aktuellen Projektordner:

```
python -m venv .venv
```


Als nächstes müssen wir das VENV aktivieren. Das VENV wird nur für die aktuelle Terminalsitzung aktiv sein. Das Schließen und erneute Öffnen des Terminals wird das VENV deaktivieren. Stellen Sie also immer sicher, dass Sie es aktivieren, bevor Sie den Code verwenden.

```
.venv\Scripts\Activate.ps1
```



### Installation der Datenbank und Aufsetzen des Datensatzes 

TODO: instruktion aufschreiben

## Installation

Um PixelPerfect-Solutions lokal zu installieren, folgen Sie diesen Schritten:

1. **Repository klonen**:
    ```bash
    git clone https://github.com/Marc0408/SDV-PixelPerfect_Solutions.git
    cd SDV-PixelPerfect_Solutions
    ```
    Alternativ kann man das Repository über Github Desktop clonen oder als ZIP herunterladen.

2. **Abhängigkeiten installieren**:
    Stellen Sie sicher, dass Sie [Node.js](https://nodejs.org/) und [npm](https://www.npmjs.com/) installiert haben.
    Im Frontend Ordner geben sie folgendes ein
    ```bash
    npm install
    ```
    Dies installiert alle Abhängigkeiten, die das Frontend benötigt.

3. **Backend starten** 
TODO:Backendinstructions

    ```bash
    npm run backend
    ```

4. **Frontend starten**:
    ```bash
    npm run dev
    ```

## Benutzung

Nach der Installation und dem Starten der Anwendung können Sie auf die Web-Applikation über Ihren Webbrowser zugreifen. Standardmäßig läuft der Server auf `http://localhost:3000`.
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

1. **Bug**: Bilder werden nicht angezeigt, da sie nicht mit der Zeitzone übereinstimmen **TODO**: Stimmt das?

**Lösung**: In den Systemeinstellung die automatische Zeizonen erkennung ausschalten, die Zeitzone manuell einstellen und der Schalter für "Automatisch an die Sommerzeit anpassen" aktivieren


---
