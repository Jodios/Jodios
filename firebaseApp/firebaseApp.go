package firebaseApp

import (
	"context"
	"os"

	firebase "firebase.google.com/go/v4"
	"github.com/jodios/logging"
	"google.golang.org/api/option"
)

var (
	FirebaseApp *firebase.App
)

func init() {
	ctx := context.Background()
	logger := logging.GetLogger("firebase-init")

	// Setting up Firebase admin SDK
	sa := option.WithCredentialsFile(os.Getenv("FIREBASE_SECRET_PATH"))
	var err error
	FirebaseApp, err = firebase.NewApp(ctx, nil, sa)
	if err != nil {
		logger.Fatal().Msgf("error initializing app: %v", err)
	}
	logger.Info().Msgf("set up firebase app: %v", FirebaseApp)
}
