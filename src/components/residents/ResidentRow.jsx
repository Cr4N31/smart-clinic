import ResidentActionButton from "./ResidentActionButton";

function ResidentRow({ resident, index, onSelectResident, user }) {
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
      <td className="px-4 py-2 border-b">{resident.phoneNumber || "-"}</td>
      <td className="px-4 py-2 border-b">{resident.emailAddress || "-"}</td>
      <td className="px-4 py-2 border-b">{user ? user.username : "-"}</td>
      <td className="px-4 py-2 border-b text-center">
      <ResidentActionButton resident={resident} onSelectResident={onSelectResident} />

      </td>
    </tr>
  );
}

export default ResidentRow;
