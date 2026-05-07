package main

import (
	"log"
	"net/http"

	"github.com/connorjs/tasks.how/domains/tasks.api/hello"
	"github.com/go-chi/chi/v5"
)

func main() {
	router := chi.NewRouter()

	router.Route("/v1", func(api chi.Router) {
		hello.Route(api)
	})

	log.Print("tasks.api listening on :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
