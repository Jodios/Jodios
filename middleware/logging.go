package middleware

import (
	"github.com/jodios/logging"
	"github.com/labstack/echo/v4"
)

func UseContextLogging(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		logger := logging.GetLogger("request-context")
		logger.With().
			Str("URI", c.Request().RequestURI)
		c.Set("logger", logger)
		return next(c)
	}
}
