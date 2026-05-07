package hello

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
)

type response struct {
	Message string `json:"message"`
}

// Route wires the slice into the shared router so the handler stays focused on
// request parsing and response shape.
func Route(router chi.Router) {
	router.Get("/hello", func(writer http.ResponseWriter, request *http.Request) {
		name := strings.TrimSpace(request.URL.Query().Get("name"))
		if name == "" {
			name = "world"
		}

		writer.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(writer).Encode(response{
			Message: "hello " + name,
		})
	})
}
