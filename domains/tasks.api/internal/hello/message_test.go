package hello

import "testing"

func TestMessage(t *testing.T) {
	t.Parallel()

	testCases := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "uses provided name",
			input:    "Goose",
			expected: "hello Goose",
		},
		{
			name:     "trims surrounding whitespace",
			input:    "  Goose  ",
			expected: "hello Goose",
		},
		{
			name:     "trims tabs and newlines",
			input:    "\n\tGoose\t\n",
			expected: "hello Goose",
		},
		{
			name:     "falls back when blank",
			input:    "   ",
			expected: "hello world",
		},
		{
			name:     "falls back when empty",
			input:    "",
			expected: "hello world",
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			if actual := Message(testCase.input); actual != testCase.expected {
				t.Fatalf("expected %q, got %q", testCase.expected, actual)
			}
		})
	}
}
