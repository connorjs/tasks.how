package hello

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestRouteUsesProvidedName(t *testing.T) {
	t.Parallel()

	router := chi.NewRouter()
	Route(router)

	request := httptest.NewRequest(http.MethodGet, "/hello?name=Goose", nil)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected 200 OK, got %d", recorder.Code)
	}

	expected := "{\"message\":\"hello Goose\"}\n"
	if recorder.Body.String() != expected {
		t.Fatalf("expected %q, got %q", expected, recorder.Body.String())
	}
}

func TestRouteFallsBackToWorld(t *testing.T) {
	t.Parallel()

	router := chi.NewRouter()
	Route(router)

	request := httptest.NewRequest(http.MethodGet, "/hello", nil)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, request)

	expected := "{\"message\":\"hello world\"}\n"
	if recorder.Body.String() != expected {
		t.Fatalf("expected %q, got %q", expected, recorder.Body.String())
	}
}
