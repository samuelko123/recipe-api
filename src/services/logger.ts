import {
    createLogger,
    format,
    transports,
} from 'winston'

class Logger {
    private static _logger = this.create_logger()

    static http(message: unknown) {
        this._logger.http(message)
    }

    static info(message: unknown) {
        this._logger.info(message)
    }

    static warn(message: unknown) {
        this._logger.warn(message)
    }

    static error(message: unknown) {
        this._logger.error(message)
    }

    private static create_logger() {
        return createLogger({
            level: 'http',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.prettyPrint(),
            ),
            transports: [
                new transports.Console({
                    level: 'http',
                    silent: (process.env.NODE_ENV === 'test'),
                }),
                new transports.File({
                    level: 'http',
                    filename: 'logs/http.log',
                    maxsize: 1 * 1000 * 1000, // 1 MB
                    maxFiles: 3,
                }),
                new transports.File({
                    level: 'info',
                    filename: 'logs/info.log',
                    maxsize: 1 * 1000 * 1000, // 1 MB
                    maxFiles: 3,
                }),
                new transports.File({
                    level: 'warn',
                    filename: 'logs/warn.log',
                    maxsize: 1 * 1000 * 1000, // 1 MB
                    maxFiles: 3,
                }),
                new transports.File({
                    level: 'error',
                    filename: 'logs/error.log',
                    maxsize: 1 * 1000 * 1000, // 1 MB
                    maxFiles: 3,
                }),
            ]
        })
    }
}

export { Logger }