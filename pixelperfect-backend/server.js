const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'sdv-pixelperfect'
});

app.get('/', (req, res) => {
    return res.json("From Backend Side");
});

// Fetch single screenshot by ID
app.get('/screenshot/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM `screenshot` WHERE ScreenshotID = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// Fetch tags for a single screenshot by screenshot ID
app.get('/screentag/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT t.TagID, t.TagName, t.TagValue
        FROM tag t
        JOIN screentag st ON t.TagID = st.TagID
        WHERE st.ScreenshotID = ?
    `;
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch all screenshots
app.get('/screenshot', (req, res) => {
    const sql = "SELECT * FROM `screenshot`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch all screentags
app.get('/screentag', (req, res) => {
    const sql = "SELECT * FROM `screentag`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch all tags
app.get('/tag', (req, res) => {
    const sql = "SELECT * FROM `tag`";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Handle filtered screenshots
app.post('/filtered-screenshots', (req, res) => {
    const { menu, area, language, weather, temperature, date } = req.body;

    let sql = `
        SELECT s.ScreenshotID, s.Path, t.TagName, t.TagValue
        FROM screenshot s
        JOIN screentag st ON s.ScreenshotID = st.ScreenshotID
        JOIN tag t ON st.TagID = t.TagID
        WHERE 1=1
    `;
    
    if (menu && menu.length > 0) {
        sql += ` AND (t.TagName = 'menu' AND t.TagValue IN (${menu.map(m => `'${m}'`).join(', ')}))`;
    }
    if (area && area.length > 0) {
        sql += ` AND (t.TagName = 'area' AND t.TagValue IN (${area.map(a => `'${a}'`).join(', ')}))`;
    }
    if (language && language.length > 0) {
        sql += ` AND (t.TagName = 'language' AND t.TagValue IN (${language.map(l => `'${l}'`).join(', ')}))`;
    }
    if (weather && weather.length > 0) {
        sql += ` AND (t.TagName = 'weather' AND t.TagValue IN (${weather.map(w => `'${w}'`).join(', ')}))`;
    }
    if (temperature && temperature.length === 2) {
        sql += ` AND (t.TagName = 'temperature' AND t.TagValue BETWEEN ${temperature[0]} AND ${temperature[1]})`;
    }
    if (date && date.from && date.to) {
        sql += ` AND (t.TagName = 'date' AND t.TagValue BETWEEN '${date.from}' AND '${date.to}')`;
    }

    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening");
});
