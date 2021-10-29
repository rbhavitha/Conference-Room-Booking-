using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingLibrary;

namespace ConferenceRoomBookings.Controllers
{
    public class AdminReportController : ApiController
    {
        public IHttpActionResult gettables()
        {
            BookingModelContainer db = new BookingModelContainer();
            List<User> usr = db.Users.ToList();
            List<Department> dept = db.Departments.ToList();
            List<Booking> book = db.Bookings.ToList();
            List<Room> room = db.Rooms.ToList();
            List<RoomType> rtype = db.RoomTypes.ToList();

            var query = (from b in book
                         join u in usr on b.user_id equals u.user_id
                         join r in room on b.room_id equals r.room_id
                         join rt in rtype on r.room_type_id equals rt.room_type_id
                         join d in dept on u.dept_id equals d.dept_id

                         select new
                         {
                             u.user_name,
                             d.dept_name,
                             r.room_id,
                             rt.room_type_name,

                         }).ToList();
            return Ok(query);
        }
    }
}
