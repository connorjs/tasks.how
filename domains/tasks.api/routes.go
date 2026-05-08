package main

import (
	"encoding/json"
	"net/http"

	"github.com/connorjs/tasks.how/domains/tasks.api/hello"
	"github.com/go-chi/chi/v5"
)

type helloResponse struct {
	Message string `json:"message"`
}

func newRouter() chi.Router {
	router := chi.NewRouter()
	router.Route("/v1", func(api chi.Router) {
		api.Get("/hello", helloHandler)
	})
	return router
}

func helloHandler(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(writer).Encode(helloResponse{
		Message: hello.Message(request.URL.Query().Get("name")),
	})
}
