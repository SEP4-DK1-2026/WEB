import { http, HttpResponse } from 'msw'
import {BASE_URL} from "../../features/fetch-weather-data/api/weatherApi"

export const handlers = [
  http.get(`${BASE_URL}/predict?hoursFromNow=24`, () => {
    return HttpResponse.json({
      
    })
  }),
]