package db

type DBI interface {
	GetNames() []string
	Close() error
}
