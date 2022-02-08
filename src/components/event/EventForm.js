import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { createEvent } from "./EventManager"
import { getGames } from "../game/GameManager"
import "./Event.css"

export const EventForm = () => {
	const history = useHistory()
	const [games, setGames] = useState([])

	/*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
	const [newEvent, setNewEvent] = useState({
		description: "",
		date: "",
		time: "",
		gameId: 0,
	})

	useEffect(() => {
		getGames().then((data) => {
			setGames(data)
		})
	}, [])

	const changeEventState = (domEvent) => {
		const copy = { ...newEvent }
		copy[domEvent.target.name] = domEvent.target.value
		// another way to do the same thing follows on the next line:
		// const copy = Object.assign({}, currentGame)
		setNewEvent(copy)
	}

	return (
		<form className='eventForm'>
			<h2 className='eventForm__title'>Register New Event</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='description'>Event Description: </label>
					<input
						type='text'
						name='description'
						required
						autoFocus
						className='form-control'
						value={newEvent.description}
						onChange={changeEventState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='date'>Event Date (YYYY-MM-DD): </label>
					<input
						type='text'
						name='date'
						required
						className='form-control'
						value={newEvent.date}
						onChange={changeEventState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='time'>Event Time (24-hrs HH:MM): </label>
					<input
						type='text'
						name='time'
						required
						className='form-control'
						value={newEvent.time}
						onChange={changeEventState}
					/>
				</div>
			</fieldset>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='gameId'>Game: </label>
					<select
						name='gameId'
						required
						className='form-control'
						value={newEvent.gameId}
						onChange={changeEventState}>
						<option value='0' label='Select a game:'></option>
						{games.map((game) => {
							return (
								<option
									value={game.id}
									key={`game.id--${game.id}`}>
									{game.title}
								</option>
							)
						})}
					</select>
				</div>
			</fieldset>
			<button
				type='submit'
				onClick={(evt) => {
					// Prevent form from being submitted
					evt.preventDefault()

					const event = {
						description: newEvent.description,
						date: newEvent.date,
						time: newEvent.time,
						game: parseInt(newEvent.gameId),
					}

					// Send POST request to your API
					createEvent(event).then(() => history.push("/events"))
				}}
				className='btn btn-2 btn-primary'>
				Create Event
			</button>
		</form>
	)
}
