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
		testCase := testCase
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			request := httptest.NewRequest(http.MethodGet, testCase.url, nil)
			recorder := httptest.NewRecorder()

			newRouter().ServeHTTP(recorder, request)

			if recorder.Code != http.StatusOK {
				t.Fatalf("expected 200 OK, got %d", recorder.Code)
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
