package main

import (
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/a-h/templ"
	"github.com/jodios/db"
	"github.com/jodios/handlers"
	"github.com/jodios/logging"
	jm "github.com/jodios/middleware"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Renderer struct{}

func (renderer Renderer) Render(
	w io.Writer,
	name string,
	component interface{},
	ctx echo.Context,
) error {
	tcomponent, ok := component.(templ.Component)
	if !ok {
		return fmt.Errorf("needs to be a templ component")
	}
	buf := templ.GetBuffer()
	defer templ.ReleaseBuffer(buf)
	if err := tcomponent.Render(ctx.Request().Context(), buf); err != nil {
		return err
	}
	return ctx.HTML(http.StatusOK, buf.String())
}

const (
	defaultPort = "3000"
)

func main() {
	defer db.DB.Close()

	logger := logging.GetLogger("request-logger")

	// Setting up http server
	e := echo.New()
	e.Renderer = Renderer{}
	e.Use(jm.UseContextLogging)
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			logger.Info().
				Str("URI", v.URI).
				Int("status", v.Status).
				Send()
			return nil
		},
	}))
	e.Static("/static", "./static")
	handlers.RootHandler(e.Group("/"))
	handlers.DownloadHandler(e.Group("/download"))
	port := os.Getenv("JODIOS_SERVER_PORT")
	if port == "" {
		port = defaultPort
	}
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
