using System.Collections.Generic;
using FastEndpoints.Swagger;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Scalar.AspNetCore;

namespace connorjs.taskshow.common.hosting.api.extensions;

internal static class OpenApiExtensions
{
	[UsedImplicitly]
	private sealed record OpenApiConfig(
		string DocumentName,
		string Title,
		string Description,
		string Version
	);

	internal static T AddCommonOpenApi<T>(this T builder)
		where T : IHostApplicationBuilder
	{
		var config = builder.Configuration.GetRequired<OpenApiConfig>("OpenApi");
		builder.Services.SwaggerDocument(o =>
		{
			o.DocumentSettings = d =>
			{
				d.DocumentName = config.DocumentName;
				d.Title = config.Title;
				d.Description = config.Description;
				d.Version = config.Version;
				d.MarkNonNullablePropsAsRequired();
			};
			o.ExcludeNonFastEndpoints = true;
			o.RemoveEmptyRequestSchema = true;
			o.ShortSchemaNames = true;
		});
		return builder;
	}

	internal static WebApplication UseCommonOpenApi(this WebApplication app)
	{
		if (app.Environment.IsDevelopment())
		{
			var openApiConfig = app.Configuration.GetRequired<OpenApiConfig>("OpenApi");
			app.UseSwaggerGen(
				s =>
				{
					s.Path = "/openapi/{documentName}.json";
				},
				u =>
				{
					u.ShowOperationIDs();
				}
			);
			app.MapScalarApiReference(
				"/docs",
				o =>
				{
					o.AddDocument(openApiConfig.DocumentName, openApiConfig.Title);
					o.DarkMode = false;
					o.DocumentDownloadType = DocumentDownloadType.None;
					o.EnabledClients =
					[
						ScalarClient.Curl,
						ScalarClient.Httpie,
						ScalarClient.Python3,
						ScalarClient.RestSharp,
						ScalarClient.Fetch,
					];
					o.Metadata = new Dictionary<string, string>()
					{
						{ "title", openApiConfig.Title },
						{ "description", openApiConfig.Description },
					};
					o.ShowOperationId = true;
				}
			);
		}

		return app;
	}
}
