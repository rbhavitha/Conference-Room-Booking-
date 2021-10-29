using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingLibrary;
using ConferenceRoomBookings.Models;

namespace ConferenceRoomBookings.Controllers
{
    public class LoginController : ApiController
    {
        private BookingModelContainer db = new BookingModelContainer();
        [HttpPost]
        public Response Login(Login lg)
        {
            User result = db.Users.FirstOrDefault(user => user.user_id == lg.id);
            if (result == null || result.user_pwd != lg.password)
            {
                return new Response { status = "Failed", message = "Invalid username or password" };
            }

            else
            {

                return new Response { status = "Success", message = "Welcome " + result.user_name };
            }


        }
    }
}
