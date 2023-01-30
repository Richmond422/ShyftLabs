import React, { useState, useEffect, useCallback } from 'react';
import {Menu} from '../Menu'
import {StudentTable} from './table';
import './index.css'

const moment = require('moment');

export const Student = () => {
    const [students, setStudents] = useState([]);
    const [newStudentInfo, setNewStudentInfo] = useState({
        firstname: "",
        familyname: "",
        birthdate: ""
    })
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    
    useEffect(() => {
        const getStudents = async () => {
            const response = await fetch('http://127.0.0.1:8000/students/')
            const data = await response.json()
            const students = JSON.parse(data);
            const allStudents = []
            for (var i = 0; i < students.length; i++) {
                const curr = {"firstname":students[i].firstname, "familyname":students[i].familyname, "birthdate":students[i].birthdate}
                allStudents.push(curr)
            }
            console.log(allStudents)
            return allStudents
        }
        let mounted = true;
        getStudents()
        .then(data => {
            if (mounted) {
                console.log(data)
                setStudents(data)
            }
        })
        return () => mounted = false;
    }, [submitted])

    const handleInput = (event) => {
        const newValue = event.target.value;
        console.log(newValue)
        setNewStudentInfo({
            ...newStudentInfo,
            [event.target.name]: newValue
        });
        setError(null)
    }

    const submitInput = (event) => {
        const addStudent = () => {
            return fetch('http://127.0.0.1:8000/addStudent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "firstname" : newStudentInfo.firstname,
                    "familyname" : newStudentInfo.familyname,
                    "birthdate" : newStudentInfo.birthdate
                })
                })
                .then(data => data.json())
        }


        event.preventDefault();
        const currentDate = moment(new Date());
        const birthdate = moment(newStudentInfo.birthdate)
        const years = currentDate.diff(birthdate, 'years', 'true')
        if (newStudentInfo.firstname === "") {
            setError("Student First Name Required")
        } else if (newStudentInfo.familyname === "") {
            setError("Student Family Name Required");
        } else if (newStudentInfo.birthdate === "") {
            setError("Student birthdate required")
        } else if (years < 10) {
            setError("Student must be atleast 10 years old!")
        } else {
            console.log("add student")
            addStudent()
            .then(() => {
                setNewStudentInfo({
                    firstname: "",
                    familyname: "",
                    birthdate: ""
                });
                setError(null)
                setSubmitted(!submitted)
            })
        }
    }


    return (
    <section id="page">
        <Menu pageWrapId={'page-wrap'} outerContainerId={'page'} />
        <h1 id="title">Students</h1>
        <div id="formName">
            <p> Student First Name</p>
            <p> Student Family Name</p>
            <p> Student Birth Date</p>
        </div>
        <div id="form">
            <input className='input'
                type="text"
                name="firstname"
                value={newStudentInfo.firstname}
                onChange={handleInput} 
            />
            <input className='input'
                type="text"
                name="familyname"
                value={newStudentInfo.familyname}
                onChange={handleInput} 
            />
            <input className='input'
                type="date"
                name="birthdate"
                value={newStudentInfo.birthdate}
                onChange={handleInput} 
            />
        </div>
        <button onClick={submitInput} id="button">Submit</button>
        <StudentTable id="table" students={students} />
        {error !== null &&
            <h3 id='error' style={{color:'red'}}>
                Error: {error}
            </h3>
        }
      </section>
    )
}