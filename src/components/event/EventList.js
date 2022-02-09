import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents, deleteEvent } from "./EventManager.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons"
import "./Event.css"

export const EventList = (props) => {
	const [events, setEvents] = useState([])
	const history = useHistory()

	const pencil = <FontAwesomeIcon icon={faPencil} />
	const trashCan = <FontAwesomeIcon icon={faTrashCan} />

	const getAllEvents = () =>
		getEvents().then((eventData) => setEvents(eventData))

	useEffect(() => {
		getAllEvents()
	}, [])

	return (
		<article className='events'>
			{events.map((event) => {
				return (
					<section key={`event--${event.id}`} className='event'>
						<div className='event__description'>
							{event.description}
						</div>
						<div className='event__players'>
							on {event.date} at {event.time}
						</div>
						<div className='event__game'>
							Game is {event.game.title}
						</div>
						<div>
							<Link
								className='btn-icon'
								to={`/events/${event.id}/update`}>
								{pencil}
							</Link>
							<button
								className='btn-icon'
								onClick={() => {
									deleteEvent(event.id).then(getAllEvents)
								}}>
								{trashCan}
							</button>
						</div>
					</section>
				)
			})}
			<button
				className='btn btn-2 btn-sep icon-create'
				onClick={() => {
					history.push({ pathname: "/events/new" })
				}}>
				Register New Game
			</button>
		</article>
	)
}
