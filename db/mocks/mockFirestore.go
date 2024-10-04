package mocks

type MockFirestore struct{}

func (mf MockFirestore) GetNames() []string {
	return []string{"mock", "data"}
}
func (mf MockFirestore) Close() error {
	return nil
}
