import React from "react"
import { Route, Router } from "react-router-dom"
import { GameList } from "./game/GameList"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { UpdateGame } from "./game/UpdateGame"
import { UpdateEvent } from "./event/UpdateEvent"

export const ApplicationViews = () => {
	return (
		<>
			<main
				style={{
					margin: "5rem 2rem",
					lineHeight: "1.75rem",
				}}>
				<Route exact path='/'>
					<GameList />
				</Route>
				<Route exact path='/events'>
					<EventList />
				</Route>
				<Route exact path='/games/new'>
					<GameForm />
				</Route>
				<Route exact path='/events/new'>
					<EventForm />
				</Route>
				<Route exact path='/games/:gameId(\d+)/update'>
					<UpdateGame />
				</Route>
				<Route exact path='/events/:eventId(\d+)/update'>
					<UpdateEvent />
				</Route>
			</main>
		</>
	)
}
