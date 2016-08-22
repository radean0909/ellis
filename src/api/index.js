import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import audio from './audio'

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/spotify', (req, res) => {
		audio();
		res.json({ version });
	});

	return api;
}
