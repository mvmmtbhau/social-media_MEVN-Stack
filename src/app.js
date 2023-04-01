const express = require('express');
const app = express();

const cors = require('cors');
const ApiError = require('./app/api-error');
const bodyParser = require('body-parser');
const path = require("path");


app.use(cors());
app.use("/image/", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

// Route
const route = require('./app/routes');

// Use route
route(app);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to lalalal' });
});

app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;