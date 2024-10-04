package handlers

import (
	"github.com/jodios/db"
	"github.com/jodios/web"
	"github.com/labstack/echo/v4"
)

func RootHandler(group *echo.Group) {
	group.GET("", getHome)
}

func getHome(ctx echo.Context) error {
	return ctx.Render(200, "home", web.Home(db.DB.GetNames()))
}
