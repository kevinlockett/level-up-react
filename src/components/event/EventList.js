import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import {
	getEvents,
	deleteEvent,
	joinEvent,
	leaveEvent,
} from "./EventManager.js"
import { format } from "date-fns"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPencil, faStar } from "@fortawesome/free-solid-svg-icons"
import "./Event.css"

export const EventList = (props) => {
	const [events, setEvents] = useState([])
	const history = useHistory()

	const pencil = <FontAwesomeIcon icon={faPencil} />
	const trashCan = <FontAwesomeIcon icon={faTrashCan} />
	const star = <FontAwesomeIcon icon={faStar} />

	const getAllEvents = () =>
		getEvents().then((eventData) => setEvents(eventData))

	useEffect(() => {
		getAllEvents()
	}, [])

	const getHumanDate = (d) => {
		const humanDate = format(new Date(d), "EEEE, MMMM d, yyyy")
		return humanDate
	}

	return (
		<article className='events'>
			<h1>Level Up Game Events</h1>
			<button
				className='btn btn-2 btn-sep icon-create'
				onClick={() => {
					history.push({ pathname: "/events/new" })
				}}>
				{star} Schedule New Event
			</button>
			{events.map((event) => {
				return (
					<section key={`event--${event.id}`} className='event'>
						<div className='event__game'>{event.game.title}</div>

						<div className='event__description'>
							{event.description}
						</div>
						<div className='event__players'>
							{getHumanDate(event.date)} @ {event.time}
						</div>
						<div>
							{event.joined ? (
								<button
									className='btn btn-3 btn-sep'
									onClick={() => {
										leaveEvent(event.id).then(getAllEvents)
									}}>
									Leave
								</button>
							) : (
								<button
									className='btn btn-2 btn-sep'
									onClick={() => {
										joinEvent(event.id).then(getAllEvents)
									}}>
									Join
								</button>
							)}
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
		</article>
	)
}
