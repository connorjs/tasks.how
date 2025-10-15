using System.Threading;
using System.Threading.Tasks;
using FastEndpoints;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;

namespace connorjs.taskshow.core.example.api.hi;

/// <summary>/hi</summary>
/// <remarks>Example “Hello, world!” operation.</remarks>
internal sealed class SayHello : Endpoint<HelloRequest, Results<Ok<HelloResponse>, ProblemDetails>>
{
	public override void Configure()
	{
		Get("/hi");
		AllowAnonymous();
	}

	public override async Task<Results<Ok<HelloResponse>, ProblemDetails>> ExecuteAsync(
		HelloRequest req,
		CancellationToken ct
	)
	{
		await Task.CompletedTask; // Example endpoint, but keep `Task` return.
		if (req?.Name == "err")
		{
			AddError(r => r.Name, "Hello, error!");
			return new ProblemDetails(ValidationFailures);
		}

		return TypedResults.Ok(new HelloResponse() { Message = $"Hello, {req?.Name ?? "world"}!" });
	}
}

/// <summary>Request for the `SayHello` operation.</summary>
[UsedImplicitly]
public sealed record HelloRequest
{
	/// <summary>The name to greet.</summary>
	[QueryParam]
	public string? Name { get; init; }
}

/// <summary>Response for the `SayHello` operation.</summary>
public sealed record HelloResponse
{
	/// <summary>The greeting message.</summary>
	public required string Message { get; init; }
}
