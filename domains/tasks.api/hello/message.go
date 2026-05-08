package hello

import "strings"

func Message(name string) string {
	trimmedName := strings.TrimSpace(name)
	if trimmedName == "" {
		trimmedName = "world"
	}

	return "hello " + trimmedName
}
