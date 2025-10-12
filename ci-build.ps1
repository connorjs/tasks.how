#!/usr/bin/env pwsh

param(
	[Parameter(Position = 0)]
	[string]$command = ""
)

switch ($command) {
	"fix" {
		$configuration = "Debug"
	}
	default {
		$configuration = "Release"
	}
}

dotnet tool restore
dotnet restore

if ($configuration -eq "Release") { dotnet csharpier check . } else { dotnet csharpier format . }

dotnet build --configuration $configuration --no-restore
