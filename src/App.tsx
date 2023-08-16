import { TableHead } from './TableComponents'
import TableBody from './TableBody'


export default function App() {
  return (
	<table className={"bg-blue-100 text-center text-3xl py-4"}>
      <TableHead></TableHead>
      <TableBody></TableBody>
	</table>
  );
}
