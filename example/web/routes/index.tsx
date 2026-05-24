import { createFileRoute } from '@tanstack/react-router'
import { hello } from "@/example/hello_ts/hello";

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return <h1>{hello()}</h1>
}
