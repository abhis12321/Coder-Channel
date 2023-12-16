import { useAuth } from "mongo/AuthProvider";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Student({ getData, student }) {
  let USER = useAuth();
  let router = useRouter();

  const handleDelete = async (id) => {
    if (!USER.user) {
      alert(`you haven't logged-in...!`);
    } else if (USER.user && USER.user.email != student.email) {
      alert(`You can not delete any account of others...!`);
    } else if (
      USER.user &&
      USER.user.email == student.email &&
      confirm("Are you sure you wanna delete this account...?")
    ) {
      let del = await fetch(`/api/mongo/form2/${id}`, {
        method: "delete",
        body: JSON.stringify(id),
      })
        .then((res) => res.json())
        .catch((err) => {
          success: false;
        });
      if (del.success) {
        alert("The user is been deleted...!");
      } else {
        alert("Sorry, the user is not been deleted...!");
      }
      getData();
      USER.logout();
    }
  };

  const handleUpdate = () => {
    if (!USER.user) {
      alert(`you haven't logged-in...!`);
    } else if (USER.user && USER.user.email != student.email) {
      alert(`You can not update any account of others...!`);
    } else if (USER.user && USER.user.email == student.email) {
      router.push(`/form2/${student._id}`);
    }
  };

  return (
    <div className="student">      
      <h2 className="student-info">
        <span>Name: </span>
        {student.name}
      </h2>      
      <h2 className="student-info">
        <span>University: </span>
        {student.university}
      </h2>
      <h2 className="student-info">
        <span>Course: </span>
        {student.course}
      </h2>
      <h2 className="student-info">
        <span>Branch: </span>
        {student.branch}
      </h2>
      <h2 className="student-info">
        <span>Semester: </span>
        {student.semester}
      </h2> 
      <FontAwesomeIcon icon={faPenToSquare} className="fontAwL" onClick={handleUpdate}/>
      <FontAwesomeIcon icon={faTrash} className="fontAwR" onClick={handleDelete}/>
    </div>
  );
}
