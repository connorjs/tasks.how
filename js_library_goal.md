Use `ts_project` only for type-checking and declaration emission (`.d.ts`), with no JS transpilation output.

Provide a separate `js_library` over the native `.ts`/`.tsx` sources so downstream JS tooling can consume source files directly.

Downstream source-consuming tools such as Vite should depend on the `js_library` target, while downstream TypeScript type-checking should continue to depend on the `ts_project` target for declarations.
