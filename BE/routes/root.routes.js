const authorizationRoutes = require("./authorization.routes");

function route(app) {
    app.use("/api/authorization", authorizationRoutes);
}

module.exports = route;