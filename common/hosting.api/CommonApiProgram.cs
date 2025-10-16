using System.Threading.Tasks;
using connorjs.taskshow.common.hosting.api.extensions;
using Microsoft.AspNetCore.Builder;

namespace connorjs.taskshow.common.hosting.api;

/// <summary>
/// The entry-point for <c>connorjs.taskshow.common.hosting.api</c>.
/// </summary>
public static class CommonApiProgram
{
	/// <summary>
	/// Creates and runs the <see cref="WebApplication"/> with common configuration.
	/// </summary>
	/// <param name="args">The command line arguments.</param>
	/// <example>
	/// Program.cs
	/// <code>
	/// using connorjs.taskshow.common.hosting.api;
	///
	/// await ApiProgram.CreateAndRunCommonApi(args);
	/// </code>
	/// </example>
	public static async Task CreateAndRunAsync(string[] args)
	{
		await WebApplication
			.CreateBuilder(args)
			// -- Register services (order can matter) --
			.AddCommonConfigurationDefaults() // Defaults must come first
			.AddCommonLogging() // Early so others can use logging
			.AddCommonOutputCache()
			.AddCommonOpenApi()
			.AddCommonEndpoints() // Last (late) because wiring up the endpoints depends on everything else
			// -- End services --
			.Build()
			// -- Middleware pipeline (order matters) --
			.UseCommonExceptionHandler() // Run exception handler first (early) to catch all exceptions
			.UseCommonLogging()
			.UseCommonOutputCache() // Before endpoints so [OutputCache] can attach
			.UseCommonEndpoints()
			.UseCommonOpenApi() // After endpoints
			// -- End middleware pipeline --
			.RunAsync();
	}
}
