'use strict';

const deprecated = (deprecatedRoutes) => {
    return (req, res, next) => {
        const requestedRoute = req.originalUrl;
        const newDeprecatedRoutes = deprecatedRoutes.flatMap(route => route.routes.map(r => `/api/${route.version}/${r}`));
        if (newDeprecatedRoutes.includes(requestedRoute)) {
            return res.status(410).json({
                message: `${requestedRoute} is deprecated`,
            });
        }
        next();
    }
}

module.exports = deprecated;