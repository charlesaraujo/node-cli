#!/usr/bin/env node

/**
 * node-cli
 * criando um cli com node
 *
 * @author Charles A Da Silva <https://github.com/charlesaraujo>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const axios = require('axios');
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);

	if (flags.type !== `explicit`) {
		flags.type = `nerdy`;
	}
	console.log(`http://api.icndb.com/jokes/random/?limitTo=[${flags.type}]`);
	if (input.includes(`joke`)) {
		const { data } = await axios.get(
			`http://api.icndb.com/jokes/random/?limitTo=[${flags.type}]`
		);
		log(data.value.joke);
	}
})();
