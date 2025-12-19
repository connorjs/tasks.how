using System;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace connorjs.taskshow.common.hosting.api.extensions;

internal static class ConfigurationExtensions
{
	internal static T GetRequired<T>(this IConfiguration config, string sectionName)
		where T : class
	{
		return config.GetSection(sectionName).Get<T>()
			?? throw new InvalidOperationException(
				$"Missing required configuration section: {sectionName}"
			);
	}

	internal static T AddCommonConfigurationDefaults<T>(this T builder)
		where T : IHostApplicationBuilder
	{
		// Capture existing sources (these include appsettings*.json, user-secrets (in dev), env vars, etc.)
		var existing = builder.Configuration.Sources.ToList();

		// Clear so that we can prepend common defaults
		builder.Configuration.Sources.Clear();

		// Base defaults
		var assembly = typeof(ConfigurationExtensions).Assembly;
		AddEmbeddedJson("appsettings.defaults.json", false);
		AddEmbeddedJson($"appsettings.defaults.{builder.Environment.EnvironmentName}.json");

		// Put back the framework’s defaults so they override common.
		existing.ForEach(builder.Configuration.Sources.Add);

		return builder;

		void AddEmbeddedJson(string fileName, bool optional = true)
		{
			using var stream = assembly.GetManifestResourceStream(fileName);
			if (stream is not null)
			{
				builder.Configuration.AddJsonStream(stream);
			}
			else if (!optional)
			{
				throw new FileNotFoundException(
					$"The configuration file '{fileName}' was not found in assembly '{assembly.GetName().Name}' and is not optional.",
					fileName
				);
			}
		}
	}
}
