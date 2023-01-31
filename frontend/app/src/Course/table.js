import './table.css'

export const CourseTable = ({courses}) => {
    if (typeof courses === 'undefined') {
        return ( 
            <table id="table">
                <tr>
                    <th>Course Name</th>
                </tr>
            </table>
        )
    }
    return (
        <table id="table">
            <tr>
                <th>Course Name</th>
            </tr>
            {courses.map((course) => {
                return (
                <tr>
                    <td>{course.name}</td>
                </tr>
                )
            })}
        </table>
    )
}