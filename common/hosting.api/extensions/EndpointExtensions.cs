using FastEndpoints;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace connorjs.taskshow.common.hosting.api.extensions;

internal static class EndpointExtensions
{
	internal static T AddCommonEndpoints<T>(this T builder)
		where T : IHostApplicationBuilder
	{
		builder.Services.AddFastEndpoints().AddValidation();
		return builder;
	}

	internal static WebApplication UseCommonEndpoints(this WebApplication app)
	{
		app.UseFastEndpoints(static c =>
		{
			c.Errors.UseProblemDetails();
			c.Endpoints.ShortNames = true;
		});
		return app;
	}
}
