import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react"

const Search = () => {
	return (
		<div className="flex gap-2">
			<Input
				placeholder="Buscar Barbearias"
			/>
			<Button className="px-2.5 py-2">
				<SearchIcon size={20} />
			</Button>
		</div>
	)
}

export { Search }