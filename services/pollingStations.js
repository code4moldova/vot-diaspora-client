import {
  pipe,
  map,
  ascend,
  prop,
  sortWith,
  slice,
  toPairs,
  reduce,
} from 'ramda'
import stations from '../data/polling-stations.json'
import { getDistanceInKm } from '../utils/geoMath'
import { camelize } from '../utils/string'

const fixDistance = (distance) =>
  distance < 10 ? distance.toFixed(1) : Math.round(distance)

export const getNearClosest = (lat, long, limit = 6) => {
  const stationsWithDistance = pipe(
    map((station) => ({
      ...station,
      distance: fixDistance(
        getDistanceInKm(lat, long, station.Latitude, station.Longitude)
      ),
    })),
    sortWith([ascend(prop('distance'))]),
    slice(0, limit),
    map(
      pipe(
        toPairs,
        reduce((c, [key, value]) => ({ ...c, [camelize(key)]: value }), {})
      )
    )
  )(stations)

  return stationsWithDistance
}
