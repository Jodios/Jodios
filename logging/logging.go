package logging

import (
	"io"
	"os"
	"time"

	"github.com/rs/zerolog"
)

func GetLogger(name string) zerolog.Logger {
	var output io.Writer
	if os.Getenv("JODIOS_ENV") == "dev" {
		output = zerolog.ConsoleWriter{
			Out:        os.Stdout,
			TimeFormat: time.RFC3339,
		}
	} else {
		output = os.Stdout
	}
	logger := zerolog.New(output).
		With().
		Timestamp().
		Str("logger", name).
		Logger()
	return logger
}
