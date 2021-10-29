using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Cors;
using System.Web.Http.Cors;
using BookingLibrary;

namespace ConferenceRoomBookings.Controllers
{
    public class JoinMultipleTableController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult gettables()
        {
            BookingModelContainer db = new BookingModelContainer();
            List<Location> loc = db.Locations.ToList();
            List<Room> room = db.Rooms.ToList();
            List<RoomType> room_type = db.RoomTypes.ToList();


            var query = (from l in loc
                         join r in room on l.location_id equals r.location_id
                         join rt in room_type on r.room_type_id
                         equals rt.room_type_id
                         //select new JoinTableModel { getLocation = l, getRoom = r, getRoomType = rt };
                         select new
                         {
                             l.location_name,
                             l.location_id,
                             l.location_address,
                             rt.room_type_name,
                             r.status,
                             rt.seating_capacity,
                             rt.table_types,
                             rt.screen,
                             rt.projector,
                             rt.network,
                             rt.no_of_machines,
                             rt.internet_connection,
                             rt.white_board,
                             rt.flip_chart,
                             r.room_id
                         }).ToList();
            return Ok(query);
        }
    }
}
