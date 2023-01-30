import './table.css'

export const StudentTable = ({students}) => {
    if (typeof students === 'undefined') {
        return ( 
            <table id="table">
                <tr>
                    <th>First Name</th>
                    <th>Family Name</th>
                    <th>BirthDate</th>
                </tr>
            </table>
        )
    }
    return (
        <table id="table">
            <tr>
                <th>First Name</th>
                <th>Family Name</th>
                <th>BirthDate</th>
            </tr>
            {students.map((student) => {
                console.log(student.firstname)
                return (
                <tr>
                    <td>{student.firstname}</td>
                    <td>{student.familyname}</td>
                    <td>{student.birthdate}</td>
                </tr>
                )
            })}
        </table>
    )
}