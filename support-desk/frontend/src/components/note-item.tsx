import { useAppSelector } from "../app/hooks"
import { selectUser } from "../features/auth/authSlice"
import { NoteType } from "../features/notes/noteSlice"

type Props = {
  note: NoteType
}

const NoteItem = ({ note }: Props) => {
  const user = useAppSelector(selectUser)
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Note from{" "}
        {note.isStaff ? <span>Staff</span> : <span>{user?.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  )
}
export default NoteItem
