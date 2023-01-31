import React, { useState, useEffect } from 'react';
import {Menu} from '../Menu'
import {GradeTable} from './table';
import './index.css'


export const Grade = () => {
    const [grades, setGrades] = useState([]);
    const [newGrade, setNewGrade] = useState({
        course: "",
        student: "",
        score: ""
    })
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    
    useEffect(() => {
        const getGrades = async () => {
            const response = await fetch('http://127.0.0.1:8000/grades/')
            const allGrades = await response.json()
            // const grades = JSON.parse(data);
            // const allGrades = []
            // for (var i = 0; i < data.length; i++) {
            //     const curr = {"firstname":students[i].firstname, "familyname":students[i].familyname, "birthdate":students[i].birthdate}
            //     allStudents.push(curr)
            // }
            return allGrades
        }
        let mounted = true;
        getGrades()
        .then(data => {
            if (mounted) {
                setGrades(data)
            }
        })
        return () => mounted = false;
    }, [submitted])

    const handleInput = (event) => {
        const newValue = event.target.value;
        setNewGrade({
            ...newGrade,
            [event.target.name]: newValue
        });
        setError(null)
    }

    const handleScore = (event) => {
        setNewGrade({
            ...newGrade,
            "score": event.target.value
        });
    }

    const submitInput = (event) => {
        const addGrade = () => {
            return fetch('http://127.0.0.1:8000/addGrade/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "student" : newGrade.student,
                    "course" : newGrade.course,
                    "score" : newGrade.score
                })
                })
                .then(data => data.json())
        }


        event.preventDefault();
        if (newGrade.course === "") {
            setError("Error: Course Name Required")
        } else if (newGrade.student === "") {
            setError("Error: Student Name Required");
        } else if (newGrade.score === "") {
            setError("Error: Score required")
        }  else {
            addGrade()
            .then(() => {
                setNewGrade({
                    student: "",
                    course: "",
                    score: ""
                });
                setError("Success, Grade added")
                setSubmitted(!submitted)
            })
        }
    }


    return (
    <section id="page">
        <Menu pageWrapId={'page-wrap'} outerContainerId={'page'} />
        <h1 id="title">Grades</h1>
        <div id="formName">
            <p> Student Name</p>
            <p> Course Name</p>
            <p> Score </p>
        </div>
        <div id="form">
            <input className='input'
                type="text"
                name="student"
                value={newGrade.student}
                onChange={handleInput} 
            />
            <input className='input'
                type="text"
                name="course"
                value={newGrade.course}
                onChange={handleInput} 
            />
            <select value={newGrade.score} onChange={handleScore} className="input">
                <option value=""></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </div>
        <button onClick={submitInput} id="button">Submit</button>
        <GradeTable id="table" grades={grades} />
        {error !== null &&
            <h3 id='error'>
                {error}
            </h3>
        }
      </section>
    )
}