package db

import (
	"context"

	"cloud.google.com/go/firestore"
	"github.com/jodios/db/mocks"
	"github.com/jodios/firebaseApp"
	"github.com/jodios/logging"
)

var (
	DB DBI
)

type FirestoreDB struct {
	client *firestore.Client
}

func init() {
	logger := logging.GetLogger("firestore-init")
	client, err := firebaseApp.FirebaseApp.Firestore(context.Background())
	if err != nil {
		logger.Error().Err(err).Msg("failed to initalize firestore. using mock store.")
		DB = mocks.MockFirestore{}
		return
	}
	DB = FirestoreDB{
		client: client,
	}
}

func (fdb FirestoreDB) GetNames() []string {
	names := make([]string, 0)
	testing := fdb.client.Collection("testing")
	nameRefs, err := testing.Documents(context.Background()).GetAll()
	if err != nil {
		return names
	}
	for _, ref := range nameRefs {
		names = append(names, ref.Data()["name"].(string))
	}
	return names
}

func (fdb FirestoreDB) Close() error {
	return fdb.client.Close()
}
