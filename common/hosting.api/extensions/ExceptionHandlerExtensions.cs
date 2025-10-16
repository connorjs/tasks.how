using FastEndpoints;
using Microsoft.AspNetCore.Builder;

namespace connorjs.taskshow.common.hosting.api.extensions;

internal static class ExceptionHandlerExtensions
{
	internal static WebApplication UseCommonExceptionHandler(this WebApplication app)
	{
		// https://fast-endpoints.com/docs/exception-handler
		app.UseDefaultExceptionHandler(logStructuredException: true, useGenericReason: true);
		return app;
	}
}
