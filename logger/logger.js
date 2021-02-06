let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'trace';
logger.debug('debug');
logger.trace('trace');
logger.error('error');


module.exports.logger = () => logger