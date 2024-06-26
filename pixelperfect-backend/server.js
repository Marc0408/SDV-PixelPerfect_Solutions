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

// Fetch all screenshots
app.get('/screenshot', (req, res) => {
    const sql = "SELECT * FROM `screenshot` WHERE `state` = 1";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch screenshots by time
app.get('/screenshot/:time', (req, res) => {
    const { time } = req.params;
    dateTime = new Date(time)
    dateTime.setHours(dateTime.getHours() + 2);
    s = dateTime.toISOString()
    const sql = "SELECT * FROM `screenshot` WHERE `Time` = ?";
    db.query(sql, [s], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Fetch screenshots by time
app.get('/tags/:time', (req, res) => {
    const { time } = req.params;
    dateTime = new Date(time)
    dateTime.setHours(dateTime.getHours() + 2);
    s = dateTime.toISOString()
    const sql = "SELECT t.TagID, t.TagName, t.TagValue FROM `screenshot` s, `screentag` st, `tag` t WHERE st.ScreenshotID = s.ScreenshotID AND st.TagID = t.TagID AND s.Time = ?";
    db.query(sql, [s], (err, data) => {
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

app.get('/filtered-screenshots', (req, res) => {
    const { menu, area, language, weather, temperature, date } = req.query;

    let sql = `
        SELECT s.ScreenshotID, s.Path, s.Time, s.State, s.Side, t.TagName, t.TagValue
        FROM screenshot s
        JOIN screentag st ON s.ScreenshotID = st.ScreenshotID
        JOIN tag t ON st.TagID = t.TagID
        WHERE 1=1
    `;
    
    if (menu) {
        sql += ` AND (t.TagName = 'Menue' AND t.TagValue IN (${menu.split(',').map(m => `'${m}'`).join(', ')}))`;
    }
    if (area) {
        sql += ` AND (t.TagName = 'Area' AND t.TagValue IN (${area.split(',').map(a => `'${a}'`).join(', ')}))`;
    }
    if (language) {
        sql += ` AND (t.TagName = 'Language' AND t.TagValue IN (${language.split(',').map(l => `'${l}'`).join(', ')}))`;
    }
    if (weather) {
        sql += ` AND (t.TagName = 'Weather' AND t.TagValue IN (${weather.split(',').map(w => `'${w}'`).join(', ')}))`;
    }
    if (temperature && temperature.includes(',')) {
        const [from, to] = temperature.split(',');
        sql += ` AND (t.TagName = 'Temperature' AND t.TagValue BETWEEN ${from} AND ${to})`;
    }
    if (date && date.includes(',')) {
        const [from, to] = date.split(',');
        sql += ` AND (s.Time BETWEEN '${from}' AND '${to}')`;
    }
    console.log(sql)
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Handle filtered screenshots
app.post('/filtered-screenshots', (req, res) => {
    const { menu, area, language, weather, temperature, date } = req.body;

    let sql = `
        SELECT s.ScreenshotID, s.Path, s.Time, s.State, s.Side
        FROM screenshot s
        JOIN screentag st ON s.ScreenshotID = st.ScreenshotID
        JOIN tag t ON st.TagID = t.TagID
        WHERE s.State = 1
    `;
    
    if (menu && menu.length > 0) {
        sql += ` AND (t.TagName = 'Menue' AND t.TagValue IN (${menu.map(m => `'${m}'`).join(', ')}))`;
    }
    if (area && area.length > 0) {
        sql += ` AND (t.TagName = 'Area' AND t.TagValue IN (${area.map(a => `'${a}'`).join(', ')}))`;
    }/*
    if (language && language.length > 0) {
        sql += ` AND (t.TagName = 'Language' AND t.TagValue IN (${language.map(l => `'${l}'`).join(', ')}))`;
    }
    if (weather && weather.length > 0) {
        sql += ` AND (t.TagName = 'Weather' AND t.TagValue IN (${weather.map(w => `'${w}'`).join(', ')}))`;
    }
    if (temperature && temperature.length === 2) {
        sql += ` AND (t.TagName = 'Temperature' AND t.TagValue BETWEEN ${temperature[0]} AND ${temperature[1]})`;
    }*/
    if (date && date.from && date.to) {
        sql += ` AND (s.Time BETWEEN '${date.from}' AND '${date.to}')`;
    }
    console.log(sql)
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening on port 8081");
});
