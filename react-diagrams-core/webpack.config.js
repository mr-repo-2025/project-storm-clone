const config = require('../../webpack.shared')(__dirname);
module.exports = {
	...config,
	// entry: './src/index.ts', // Asegúrate de que esta ruta sea correcta
	output: {
		...config.output,
		library: 'projectstorm/react-canvas-core'
	} 
};
