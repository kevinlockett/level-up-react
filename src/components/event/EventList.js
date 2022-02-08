import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager.js"
import "./Event.css"

export const EventList = (props) => {
	const [events, setEvents] = useState([])
	const history = useHistory()

	useEffect(() => {
		getEvents().then((data) => setEvents(data))
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
