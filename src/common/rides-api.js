import { hostName } from "../helpers/host-name"

const getCreatedRides = (user) =>
    fetch(`http://${hostName}:8080/carpool-be/api/ride/findUpcomingByUserId/`+user.id)
      .then((response) => response.json())

const getTakenRides = (user) =>
    fetch(`http://${hostName}:8080/carpool-be/api/ride/findUpcomingTakenRidesByUserId/`+user.id)
        .then((response) => response.json())

export {
    getCreatedRides,
    getTakenRides,
}
