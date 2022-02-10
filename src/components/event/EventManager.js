export const getEvents = () => {
	return fetch("http://localhost:8000/events", {
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
		},
	}).then((response) => response.json())
}

export const getEvent = (eventId) => {
	return fetch(`http://localhost:8000/events/${eventId}`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
		},
	}).then((response) => response.json())
}

export const createEvent = (event) => {
	return fetch("http://localhost:8000/events", {
		method: "POST",
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
	}).then((response) => response.json())
}

export const updateEvent = (event) => {
	return fetch(`http://localhost:8000/events/${event.id}`, {
		method: "PUT",
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(event),
	})
}

export const deleteEvent = (eventId) => {
	return fetch(`http://localhost:8000/events/${eventId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
		},
	})
}

export const joinEvent = (eventId) => {
	return fetch(`http://localhost:8000/events/${eventId}/signup`, {
		method: "POST",
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(eventId),
	}).then((response) => response.json())
}

export const leaveEvent = (eventId) => {
	return fetch(`http://localhost:8000/events/${eventId}/leave`, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${localStorage.getItem("lu_token")}`,
		},
	})
}
