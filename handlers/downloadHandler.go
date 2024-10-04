package handlers

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
)

func DownloadHandler(group *echo.Group) {
	group.GET("", getDownload)
	group.GET("/re-trigger", getDownloadTrigger)
}

func getDownload(ctx echo.Context) error {
	time.Sleep(time.Second * 2)
	ctx.Response().Header().Add("HX-Trigger", "download-done-trigger")
	return nil
}

func getDownloadTrigger(ctx echo.Context) error {
	return ctx.String(http.StatusOK, "Download Triggered This Oh Yea!")
}
