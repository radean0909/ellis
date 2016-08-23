import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import {
	startRain, 
	stopRain, 
	startNews, 
	stopNews, 
	pauseNews,
	resumeNews } from './audio';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/rain/start', (req, res) => {
		startRain();
		res.json({ 
			status: 'playing',
			media: 'rain'  
		});
	});

	api.get('/rain/stop', (req, res) => {
		stopRain();
		res.json({ 
			status: 'stopped'
		});
	});

	api.get('/news/start', (req, res) => {
		startNews();
		res.json({ 
			status: 'playing',
			media: 'news'  
		});
	})

	api.get('/news/stop', (req, res) => {
		stopNews();
		res.json({
			status: 'stopped'
		});
	});

	api.get('/news/pause', (req, res) => {
		pauseNews();
		res.json({ 
			status: 'paused',
			media: 'news'  
		});
	})

	api.get('/news/resume', (req, res) => {
		resumeNews();
		res.json({ 
			status: 'playing',
			media: 'news'  
		});
	})

	return api;
}
