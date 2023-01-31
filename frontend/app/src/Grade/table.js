import './table.css'

export const GradeTable = ({grades}) => {
    if (typeof grades === 'undefined') {
        return ( 
            <table id="table">
                <tr>
                    <th>Course</th>
                    <th>Student</th>
                    <th>Score</th>
                </tr>
            </table>
        )
    }
    return (
        <table id="table">
            <tr>
                <th>Course</th>
                <th>Student</th>
                <th>Score</th>
            </tr>
            {grades.map((grade) => {
                return (
                <tr>
                    <td>{grade.course}</td>
                    <td>{grade.student}</td>
                    <td>{grade.score}</td>
                </tr>
                )
            })}
        </table>
    )
}