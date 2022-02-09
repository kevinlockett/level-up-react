import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getEvent, updateEvent } from "./EventManager"
import { getGames } from "../game/GameManager"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import "./Event.css"

export const UpdateEvent = () => {
	const [games, setGames] = useState([])
	const [currentEvent, setCurrentEvent] = useState({})
	const { eventId } = useParams()
	const history = useHistory()

	const element = <FontAwesomeIcon icon={faCoffee} />

	useEffect(() => {
		getGames().then((data) => {
			setGames(data)
		})
	}, [])

	useEffect(() => {
		getEvent(eventId).then((eventData) => {
			setCurrentEvent(eventData)
		})
	}, [])

	const changeEventState = (domEvent) => {
		const copy = { ...currentEvent }
		copy[domEvent.target.name] = domEvent.target.value
		// another way to do the same thing follows on the next line:
		// const copy = Object.assign({}, currentGame)
		setCurrentEvent(copy)
	}

	return (
		<form className='eventForm'>
			<h2 className='eventForm__description'>
				Update {currentEvent.description}
			</h2>
			<fieldset>
				<div className='form-group'>
					<label htmlFor='description'>Event Description: </label>
					<input
						type='text'
						name='description'
						required
						autoFocus
						className='form-control'
						defaultValue={currentEvent.description}
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
						defaultValue={currentEvent.date}
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
						defaultValue={currentEvent.time}
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
						value={currentEvent.game}
						onChange={changeEventState}>
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

					// Send PUT request to your API
					updateEvent(currentEvent).then(() =>
						history.push("/events")
					)
				}}
				className='btn btn-2 btn-primary'>
				Update Event
			</button>
		</form>
	)
}
