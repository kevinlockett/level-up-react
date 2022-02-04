import React, { useEffect } from "react"
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
	const [events, setEvents] = useState([])

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
		</article>
	)
}
