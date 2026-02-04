import ResidentActionButton from "./ResidentActionButton";

function ResidentRow({ resident, index, onSelectResident }) {
  return (
    <tr className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
      <td className="px-4 py-2 border-b">{index + 1}</td>
      <td className="px-4 py-2 border-b">{resident.firstName}</td>
      <td className="px-4 py-2 border-b">{resident.otherName}</td>
      <td className="px-4 py-2 border-b">{resident.lastName}</td>
      <td className="px-4 py-2 border-b">{resident.residentNumber}</td>
      <td className="px-4 py-2 border-b">
        {resident.genotype} / {resident.bloodGroup || "-"}
      </td>
      <td className="px-4 py-2 border-b">{resident.phone || "-"}</td>
      <td className="px-4 py-2 border-b">{resident.registeredBy || "-"}</td>
      <td className="px-4 py-2 border-b text-center">
      <ResidentActionButton resident={resident} onSelectResident={onSelectResident} />

      </td>
    </tr>
  );
}

export default ResidentRow;
