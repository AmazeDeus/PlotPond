import "~/styles/globals.css"

/* Components */
import { ThemeProvider } from "~/components/theme-provider"

export const metadata = {
	title: "PlotPond - Explore Unique Stories and Scenarios",
	description: "A social platform where users can explore, and share their own stories and scenarios they have crafted.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark" style={{ colorScheme: "dark" }}>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
