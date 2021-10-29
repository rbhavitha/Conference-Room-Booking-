using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingLibrary;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace ConferenceRoomBookings.Controllers
{
    public class ConfirmBookingController : ApiController
    {
        public IHttpActionResult gettables()        {            BookingModelContainer db = new BookingModelContainer();
            List<User> user = db.Users.ToList();
            List<Booking> booking = db.Bookings.ToList();
            List<Room> room = db.Rooms.ToList();
            List<Location> loc = db.Locations.ToList();
            List<Owner> owner = db.Owners.ToList();
            var query = from u in user
                        join b in booking on u.user_id equals b.user_id
                        join r in room on b.room_id equals r.room_id
                        join l in loc on r.location_id equals l.location_id
                        join o in owner on r.owner_id equals o.owner_id
                        //select new BookingDetails { getUser = u, getBooking = b, getRoom = r, getLocation = l };
                        select new
                        {
                            b.booking_id,
                            u.user_name,
                            u.user_id,
                            l.location_name,
                            l.location_address,
                            r.room_id,
                            b.start_date,
                            b.end_date,
                            o.owner_id,
                            o.owner_phno,
                            o.owner_name,
                            o.owner_emailid
                        };            return Ok(query);
        }
    }
}
