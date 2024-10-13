'use strict';

const server = require('./src/v1/app');
const PORT = process.env.PORT || 8000;
const colors = require('./src/v1/configs/colors.config');

server.listen(PORT, () => {
	console.log(
		colors.bg.blue,
		colors.fg.black,
		`Server is running on port::${PORT} ⚝`,
		colors.reset
	);
	console.log();
});
