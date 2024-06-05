import mysql.connector
import constants

mydb = mysql.connector.connect(
    host=str(constants.host),
    user=str(constants.user),
    password=str(constants.password),
    port=str(constants.port)
)
 
# Creating an instance of 'cursor' class 
# which is used to execute the 'SQL' 
# statements in 'Python'
cursor = mydb.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS `sdv-pixelperfect`")
mydb.disconnect()


mydb = mysql.connector.connect(
    host=str(constants.host),
    user=str(constants.user),
    password=str(constants.password),
    port=int(constants.port),
    database=str(constants.database)
)

cursor = mydb.cursor()

cursor.execute("""
    SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    START TRANSACTION;
    SET time_zone = "+00:00";


    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8mb4 */;

    --
    -- Datenbank: `sdv-pixelperfect`
    --

    -- --------------------------------------------------------

    --
    -- Tabellenstruktur für Tabelle `screenshot`
    --

    CREATE TABLE `screenshot` (
    `ScreenshotID` int(11) NOT NULL,
    `Path` text NOT NULL,
    `State` tinyint(11) NOT NULL,
    `Side` tinyint(11) NOT NULL,
    `Time` datetime NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    -- --------------------------------------------------------

    --
    -- Tabellenstruktur für Tabelle `screentag`
    --

    CREATE TABLE `screentag` (
    `ScreenTagID` int(11) NOT NULL,
    `ScreenshotID` int(11) NOT NULL,
    `TagID` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    -- --------------------------------------------------------

    --
    -- Tabellenstruktur für Tabelle `tag`
    --

    CREATE TABLE `tag` (
    `TagID` int(11) NOT NULL,
    `TagName` text NOT NULL,
    `TagValue` text NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    --
    -- Indizes der exportierten Tabellen
    --

    --
    -- Indizes für die Tabelle `screenshot`
    --
    ALTER TABLE `screenshot`
    ADD PRIMARY KEY (`ScreenshotID`);

    --
    -- Indizes für die Tabelle `screentag`
    --
    ALTER TABLE `screentag`
    ADD PRIMARY KEY (`ScreenTagID`);

    --
    -- Indizes für die Tabelle `tag`
    --
    ALTER TABLE `tag`
    ADD PRIMARY KEY (`TagID`);

    --
    -- AUTO_INCREMENT für exportierte Tabellen
    --

    --
    -- AUTO_INCREMENT für Tabelle `screenshot`
    --
    ALTER TABLE `screenshot`
    MODIFY `ScreenshotID` int(11) NOT NULL AUTO_INCREMENT;

    --
    -- AUTO_INCREMENT für Tabelle `screentag`
    --
    ALTER TABLE `screentag`
    MODIFY `ScreenTagID` int(11) NOT NULL AUTO_INCREMENT;

    --
    -- AUTO_INCREMENT für Tabelle `tag`
    --
    ALTER TABLE `tag`
    MODIFY `TagID` int(11) NOT NULL AUTO_INCREMENT;
    COMMIT;""")

