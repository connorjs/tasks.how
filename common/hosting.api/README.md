# connorjs.taskshow.common.hosting.api

Common hosting package for .NET APIs.
Centralizes shared configuration and start-up code for APIs.

_Note: This package is structured to showcase a NuGet package existing in a polyrepo situation.
However, given this repository actually exists as a monorepo, the sdk files are “directly referenced” from the root._

## Details

- Uses [FastEndpoints](https://fast-endpoints.com/) for API endpoints
- Uses [Scalar](https://github.com/scalar/scalar#readme) for Open API documentation
- Establishes common conventions (logging, output cache, Problem Details)
