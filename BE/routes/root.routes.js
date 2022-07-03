const authorizationRoutes = require("./authorization.routes");
const necessaryRoutes=require("./necessary.routes");

function route(app) {
    app.use("/api/authorization", authorizationRoutes);
    app.use("/api/necessary", necessaryRoutes);
}

module.exports = route;