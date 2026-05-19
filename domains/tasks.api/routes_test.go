package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloRoute(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		name     string
		url      string
		expected string
	}{
		{
			name:     "uses provided name",
			url:      "/v1/hello?name=Goose",
			expected: "hello Goose",
		},
		{
			name:     "falls back to world",
			url:      "/v1/hello",
			expected: "hello world",
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			request := httptest.NewRequest(http.MethodGet, testCase.url, nil)
			recorder := httptest.NewRecorder()

			newRouter().ServeHTTP(recorder, request)

			if recorder.Code != http.StatusOK {
				t.Fatalf("expected 200 OK, got %d", recorder.Code)
			}

			if contentType := recorder.Header().Get("Content-Type"); contentType != "application/json" {
				t.Fatalf("expected application/json content type, got %q", contentType)
			}

			var response helloResponse
			if err := json.Unmarshal(recorder.Body.Bytes(), &response); err != nil {
				t.Fatalf("decode response: %v", err)
			}

			if response.Message != testCase.expected {
				t.Fatalf("expected %q, got %q", testCase.expected, response.Message)
			}
		})
	}
}

func TestHelloRouteRejectsUnsupportedRequests(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		name       string
		method     string
		url        string
		wantStatus int
	}{
		{
			name:       "unknown path",
			method:     http.MethodGet,
			url:        "/v1/goodbye",
			wantStatus: http.StatusNotFound,
		},
		{
			name:       "unsupported method",
			method:     http.MethodPost,
			url:        "/v1/hello",
			wantStatus: http.StatusMethodNotAllowed,
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			request := httptest.NewRequest(testCase.method, testCase.url, nil)
			recorder := httptest.NewRecorder()

			newRouter().ServeHTTP(recorder, request)

			if recorder.Code != testCase.wantStatus {
				t.Fatalf("expected status %d, got %d", testCase.wantStatus, recorder.Code)
			}
		})
	}
}
