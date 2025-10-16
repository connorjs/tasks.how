# connorjs.taskshow.common.sdk

Common SDK package for all .NET projects.
Centralizes shared properties and establishes conventions for source and test projects.

_Note: This package is structured to showcase a NuGet package existing in a polyrepo situation.
However, given this repository actually exists as a monorepo, the sdk files are “directly referenced” from the root._

## Details

- Configures rules in a `.globalconfig` file.
- Configures properties in a `.props` file.
- Includes [SonarAnalyzer.CSharp](https://www.nuget.org/packages/SonarAnalyzer.CSharp) analyzer package.
- Turns off all rules that conflict with [CSharpier](https://csharpier.com/).
