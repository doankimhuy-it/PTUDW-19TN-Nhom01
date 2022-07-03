const authorizationRoutes = require("./authorization.routes");
const necessaryRoutes = require("./necessary.routes");
const locationRoutes = require("./location.routes")

function route(app) {
    app.use("/api/authorization", authorizationRoutes);
    app.use("/api/necessary", necessaryRoutes);
    app.use("/api/location", locationRoutes);
}

module.exports = route;