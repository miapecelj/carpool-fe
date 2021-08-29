const getCreatedRides = (user) =>
    fetch("http://localhost:8080/carpool-be/api/ride/findUpcomingByUserId/"+user.id)
      .then((response) => response.json())

const getTakenRides = (user) =>
    fetch("http://localhost:8080/carpool-be/api/ride/findUpcomingTakenRidesByUserId/"+user.id)
        .then((response) => response.json())

export {
    getCreatedRides,
    getTakenRides,
}
