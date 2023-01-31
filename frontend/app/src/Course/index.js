import React, { useState, useEffect } from 'react';
import {Menu} from '../Menu'
import {CourseTable} from './table'
import './index.css'

export const Course = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        name: "",
    })
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch('http://127.0.0.1:8000/courses/')
            const data = await response.json()
            const courses = JSON.parse(data);
            const allCourses = []
            for (var i = 0; i < courses.length; i++) {
                const curr = {"name":courses[i].name}
                allCourses.push(curr)
            }
            return allCourses
        }
        let mounted = true;
        getCourses()
        .then(data => {
            if (mounted) {
                setCourses(data)
            }
        })
        return () => mounted = false;
    }, [submitted])

    const handleInput = (event) => {
        const newValue = event.target.value;
        setNewCourse({
            [event.target.name]: newValue
        });
        setError(null)
    }

    const submitInput = (event) => {
        const addCourse = () => {
            return fetch('http://127.0.0.1:8000/addCourse/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name" : newCourse.name
                })
                })
                .then(data => data.json())
        }

        event.preventDefault();
        if (newCourse.name === "") {
            setError("Error: Course Name Required")
        } else if (courses.findIndex((course) => course.name === newCourse.name) !== -1){
            setError("Error: Course Name already exists")
        } else {
            addCourse()
            .then(() => {
                setNewCourse({
                    name: "",
                });
                setError("Success: Course Added")
                setSubmitted(!submitted)
            })
        }
    }


    return (
    <section id="page2">
        <Menu pageWrapId={'page-wrap'} outerContainerId={'page'} />
        <h1 id="title">Courses</h1>
        <div id="formName">
            <p> Course Name</p>
        </div>
        <div id="form">
            <input className='input'
                type="text"
                name="name"
                value={newCourse.name}
                onChange={handleInput} 
            />
        </div>
        <button onClick={submitInput} id="button">Submit</button>
        <CourseTable id="table" courses={courses} />
        {error !== null &&
            <h3 id='error'>
                {error}
            </h3>
        }
      </section>
    )
}